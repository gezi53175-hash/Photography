import { useEffect, useState } from "react";

type Page = "home" | "cases" | "about" | "detail";

type PhotoItem = {
  alt: string;
  src: string;
};

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const navItems: Array<{ key: Page; label: string }> = [
  { key: "home", label: "首页" },
  { key: "cases", label: "客户案例" },
  { key: "about", label: "关于我们" },
];

const contactItems = [
  { icon: "clock", title: "营业时间", value: "8:00-22:00" },
  { icon: "message", title: "微信", value: "Lim122188" },
  { icon: "phone", title: "服务热线", value: "18829387465" },
  { icon: "book", title: "小红书", value: "黎啦啦啦" },
];

const homePhotos: PhotoItem[] = [
  { src: asset("home-birthday.jpg"), alt: "儿童一周岁生日写真" },
  { src: asset("home-baby.jpg"), alt: "婴儿成长纪念照" },
  { src: asset("home-mother-kids.jpg"), alt: "亲子居家摄影" },
  { src: asset("home-party.jpg"), alt: "儿童生日派对写真" },
  { src: asset("home-wedding-car.jpg"), alt: "纪念日花束摄影" },
  { src: asset("home-camp.jpg"), alt: "户外露营家庭摄影" },
  { src: asset("home-birthday.jpg"), alt: "儿童生日主题写真" },
];

const casePhotos: PhotoItem[] = [
  { src: asset("case-family-walk.jpg"), alt: "全家福户外摄影" },
  { src: asset("case-father-son.jpg"), alt: "父子户外摄影" },
  { src: asset("case-seaside.jpg"), alt: "海边亲子摄影" },
  { src: asset("case-sunset.jpg"), alt: "傍晚亲子摄影" },
  { src: asset("case-kite.jpg"), alt: "草地放风筝亲子摄影" },
  { src: asset("case-picnic.jpg"), alt: "野餐家庭摄影" },
];

const relatedPhotos: PhotoItem[] = [
  { src: asset("home-party.jpg"), alt: "相关相册：生日派对" },
  { src: asset("home-wedding-car.jpg"), alt: "相关相册：纪念日" },
  { src: asset("home-camp.jpg"), alt: "相关相册：户外露营" },
];

const categories = ["全部", "全家福", "孕期", "新生儿", "儿童", "户外"];

function getInitialPage(): Page {
  const hash = window.location.hash.replace("#/", "");
  if (hash === "cases" || hash === "about" || hash === "detail") return hash;
  return "home";
}

function App() {
  const [page, setPage] = useState<Page>(getInitialPage);

  useEffect(() => {
    const syncPage = () => setPage(getInitialPage());
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  return (
    <div className="app-shell">
      <SiteHeader active={page === "detail" ? "home" : page} />
      <main>
        {page === "cases" && <CasesPage />}
        {page === "about" && <AboutPage />}
        {page === "detail" && <DetailPage />}
        {page === "home" && <HomePage />}
      </main>
    </div>
  );
}

function SiteHeader({ active }: { active: Page }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/">
        <span className="brand-mark" aria-hidden="true">
          <CameraIcon />
        </span>
        <span>一言家庭摄影</span>
      </a>

      <nav className="main-nav" aria-label="主导航">
        {navItems.map((item) => (
          <a
            className={`nav-link ${active === item.key ? "is-active" : ""}`}
            href={`#/${item.key === "home" ? "" : item.key}`}
            key={item.key}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <a className="pill-button is-light" href="#/about">
          联系我们
        </a>
        <a className="pill-button is-primary" href="#/about">
          预约拍摄
        </a>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <section className="home-page">
      <section className="home-hero">
        <img src={asset("new-home-hero.jpg")} alt="花园里的家庭摄影场景" />
        <div className="hero-content">
          <h1>一言家庭摄影 家庭的爱，镜头下的故事</h1>
          <p>让照片讲述你们的故事，让回忆永远鲜活</p>
          <div className="hero-actions">
            <a className="pill-button is-white" href="#/cases">
              查看服务
            </a>
            <a className="pill-button is-ghost" href="#/about">
              预约咨询
            </a>
          </div>
        </div>
      </section>

      <QuickContact />

      <section className="section-wrap gallery-section" aria-labelledby="latest-title">
        <div className="section-heading">
          <h2 id="latest-title">最新作品</h2>
          <p>一起记录成长的瞬间与温暖的日常</p>
        </div>
        <div className="home-mosaic">
          <PhotoCard className="mosaic-large" photo={homePhotos[0]} />
          <div className="mosaic-stack">
            <PhotoCard className="mosaic-short" photo={homePhotos[1]} />
            <PhotoCard className="mosaic-short" photo={homePhotos[2]} />
          </div>
          <PhotoCard className="mosaic-large" photo={homePhotos[3]} />
          <PhotoCard className="mosaic-large" photo={homePhotos[4]} />
          <PhotoCard className="mosaic-large" photo={homePhotos[5]} />
          <PhotoCard className="mosaic-large" photo={homePhotos[6]} />
        </div>
      </section>
    </section>
  );
}

function QuickContact() {
  return (
    <section className="quick-contact" aria-label="联系信息">
      {contactItems.map((item) => (
        <article className="contact-card" key={item.title}>
          <span className="contact-icon" aria-hidden="true">
            {item.icon === "clock" && <ClockIcon />}
            {item.icon === "message" && <MessageIcon />}
            {item.icon === "phone" && <PhoneIcon />}
            {item.icon === "book" && <BookIcon />}
          </span>
          <span className="contact-copy">
            <strong>{item.title}</strong>
            <small>{item.value}</small>
          </span>
        </article>
      ))}
    </section>
  );
}

function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const hasCases = selectedCategory === 0;

  return (
    <section className="cases-page section-wrap">
      <aside className="category-filter" aria-label="作品分类">
        <h1>分类</h1>
        <div className="category-list">
          {categories.map((category, index) => (
            <button
              className={selectedCategory === index ? "is-selected" : ""}
              key={`${category}-${index}`}
              onClick={() => setSelectedCategory(index)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </aside>

      {hasCases ? (
        <section className="case-grid" aria-label="客户案例作品">
          {casePhotos.map((photo) => (
            <PhotoCard key={photo.src} photo={photo} />
          ))}
        </section>
      ) : (
        <section className="case-empty" aria-label="暂无案例">
          <div className="case-empty-icon" aria-hidden="true">
            <ImageIcon />
          </div>
          <h2>暂无案例</h2>
          <p>当前分类还没有上传作品，请先查看其他分类。</p>
        </section>
      )}
    </section>
  );
}

function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <img src={asset("about-hero.jpg")} alt="户外亲子家庭摄影场景" />
      </div>

      <article className="about-content section-wrap">
        <AboutSection title="品牌故事">
          在快节奏的生活当中，我们总希望有些东西能够慢下来，让时间停留片刻。【温馨记忆】家庭摄影工作室正是这样一个地方--它不仅仅是一个拍照的空间，更是每个家庭故事开始的地方。自成立以来，我们致力于捕捉每一个家庭成员之间最真实、最自然的情感交流瞬间，通过镜头记录下爱与成长的故事。
        </AboutSection>

        <AboutSection title="特色服务">
          <div className="service-list">
            <ServiceItem
              title="1. 家庭肖像"
              text="无论是三口之家还是四世同堂，我们都将精心布置场景，为您打造独一无二的家庭合影。"
            />
            <ServiceItem
              title="2. 儿童成长记"
              text="从宝宝的第一声啼哭到蹒跚学步，再到每一次重要的成长里程碑，我们的摄影师都会用专业的眼光和技巧记录下这些珍贵时刻。"
            />
            <ServiceItem
              title="3. 孕妇写真"
              text="怀孕是女性生命中一段特别而美好的时期，我们提供专业的孕妇拍摄服务，帮助准妈妈们留住这段难忘的经历。"
            />
            <ServiceItem
              title="4. 宠物家庭照"
              text="对于许多家庭来说，宠物也是不可或缺的一员。因此，我们也欢迎带上您的毛孩子一起来参加拍摄，共同创造更多美好回忆。"
            />
          </div>
        </AboutSection>

        <AboutSection title="团队介绍">
          由一群热爱生活、富有创造力的专业摄影师组成。每位成员都经过严格筛选，并接受过系统的培训，在光影运用、构图美学等方面有着深厚的造诣。更重要的是，他们擅长与客户沟通交流，能够准确把握客户需求，确保每一张照片都能达到甚至超越顾客预期。
        </AboutSection>

        <AboutSection title="环境说明">
          工作室位于城市中心地带，交通便利。内部装修温馨舒适，设有多个不同风格的主题摄影棚供选择；同时配备了先进的摄影器材以及后期制作软件，保证了作品质量的同时也为顾客提供了良好的体验感。
        </AboutSection>

        <section className="about-section contact-section">
          <h2>联系方式</h2>
          <div className="about-contact-card">
            <div>
              <strong>电话</strong>
              <span>[请根据实际情况填写]</span>
            </div>
            <div>
              <strong>邮箱</strong>
              <span>[请根据实际情况填写]</span>
            </div>
            <div>
              <strong>微信公众号/小程序</strong>
              <span>[请根据实际情况填写]</span>
            </div>
            <div>
              <strong>营业时间</strong>
              <span>8:00-22:00</span>
            </div>
            <p>加入我们吧！让我们一起用镜头定格那些平凡日子里不平凡的美好瞬间，为您的家庭留下永恒的记忆。</p>
          </div>
        </section>
      </article>
    </section>
  );
}

function AboutSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="about-section">
      <h2>{title}</h2>
      {typeof children === "string" ? <p>{children}</p> : children}
    </section>
  );
}

function ServiceItem({ text, title }: { text: string; title: string }) {
  return (
    <div className="service-item">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function DetailPage() {
  return (
    <section className="detail-page section-wrap">
      <header className="detail-title">
        <h1>快乐一周岁</h1>
        <p>这里是一句副文案啊啊啊啊啊哈哈哈</p>
      </header>

      <PhotoCard className="main-detail-photo" photo={{ src: asset("home-birthday.jpg"), alt: "快乐一周岁儿童写真" }} />

      <section className="related-section" aria-labelledby="related-title">
        <div className="related-header">
          <h2 id="related-title">相关相册</h2>
          <a href="#/cases">查看更多</a>
        </div>
        <div className="related-row">
          {relatedPhotos.map((photo) => (
            <PhotoCard key={photo.src} photo={photo} />
          ))}
        </div>
      </section>

      <section className="detail-cta">
        <div>
          <h2>想拍出同款温暖氛围？</h2>
          <p>预约咨询，我们会根据场地、季节、服装为你定制拍摄方案。</p>
        </div>
        <div className="detail-cta-actions">
          <a className="pill-button is-light" href="#/about">
            查看服务
          </a>
          <a className="pill-button is-primary" href="#/about">
            预约咨询
          </a>
        </div>
      </section>
    </section>
  );
}

function PhotoCard({ className = "", photo }: { className?: string; photo: PhotoItem }) {
  return (
    <a className={`photo-card ${className}`} href="#/detail">
      <img src={photo.src} alt={photo.alt} />
    </a>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M7.8 7.5 9.2 5h5.6l1.4 2.5H19a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5a2 2 0 0 1 2-2h2.8Z" />
      <circle cx="12" cy="13" r="3.4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.8V12l3 2" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M5 6.5h14v9H9.4L5 18.8v-3.3H5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M7.1 4.8 10 8.1 8.7 10.3c1.1 2.2 2.8 3.9 5.1 5.1l2.2-1.3 3.3 2.9-.7 2.8c-.2.8-.9 1.2-1.7 1.1-7.1-.9-12.7-6.5-13.5-13.5-.1-.8.4-1.5 1.1-1.7z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M5.5 5.2h5.2c1 0 1.8.3 2.3 1v12.5c-.5-.7-1.3-1-2.3-1H5.5z" />
      <path d="M18.5 5.2h-5.2c-1 0-1.8.3-2.3 1v12.5c.5-.7 1.3-1 2.3-1h5.2z" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 48 48" role="img">
      <path d="M10 14h28v22H10z" />
      <path d="m16 30 6-7 5 5 3-3 6 7" />
      <circle cx="32" cy="20" r="2.5" />
    </svg>
  );
}

export default App;
