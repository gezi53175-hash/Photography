import { useEffect, useState } from "react";

type Page = "home" | "cases" | "about" | "detail";

const navItems: Array<{ key: Page; label: string }> = [
  { key: "home", label: "首页" },
  { key: "cases", label: "客户案例" },
  { key: "about", label: "关于我们" },
];

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

const contactItems = [
  { icon: "chat", title: "营业时间", value: "8:00-22:00" },
  { icon: "wechat", title: "微信", value: "Lim122188" },
  { icon: "phone", title: "服务热线", value: "18829387465" },
  { icon: "book", title: "小红书", value: "黎啦啦啦" },
];

const homeGallery = [
  {
    src: asset("home-birthday.jpg"),
    alt: "一周岁生日儿童摄影",
    className: "home-card home-card-large",
  },
  {
    src: asset("home-camp.jpg"),
    alt: "户外家庭露营摄影",
    className: "home-card home-card-large",
  },
  {
    src: asset("home-baby.jpg"),
    alt: "婴儿成长纪念照",
    className: "home-card",
  },
  {
    src: asset("home-mother-kids.jpg"),
    alt: "母子家庭摄影",
    className: "home-card",
  },
  {
    src: asset("home-party.jpg"),
    alt: "儿童生日派对摄影",
    className: "home-card",
  },
  {
    src: asset("home-wedding-car.jpg"),
    alt: "家庭纪念日摄影",
    className: "home-card",
  },
];

const caseImages = [
  { src: asset("case-family-walk.jpg"), alt: "林间家庭漫步" },
  { src: asset("case-father-son.jpg"), alt: "父子户外摄影" },
  { src: asset("case-seaside.jpg"), alt: "海边亲子摄影" },
  { src: asset("case-sunset.jpg"), alt: "黄昏亲子摄影" },
  { src: asset("case-kite.jpg"), alt: "草地放风筝摄影" },
  { src: asset("case-picnic.jpg"), alt: "野餐家庭摄影" },
];

const categories = ["分类1哈哈", "分类2哈哈", "分类2哈哈", "分类2哈哈", "分类2哈哈"];

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
    <>
      <SiteHeader active={page === "detail" ? "home" : page} />
      <main>
        {page === "cases" && <CasesPage />}
        {page === "about" && <AboutPage />}
        {page === "detail" && <DetailPage />}
        {page === "home" && <HomePage />}
      </main>
    </>
  );
}

function SiteHeader({ active }: { active: Page }) {
  return (
    <header className="site-header">
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
    </header>
  );
}

function HomePage() {
  return (
    <section className="page home-page">
      <div className="hero">
        <img src={asset("home-hero.jpg")} alt="一家人在草地上放风筝" />
      </div>

      <ContactBar />

      <section className="home-intro" aria-labelledby="home-title">
        <h1 id="home-title">
          <span>一言家庭摄影</span>
          <strong>家庭的爱，镜头下的故事</strong>
        </h1>
        <p>让照片讲述你们的故事，让回忆永远鲜活</p>
      </section>

      <section className="home-gallery" aria-label="精选作品">
        {homeGallery.map((image, index) => (
          <a href="#/detail" className={image.className} key={`${image.src}-${index}`}>
            <img src={image.src} alt={image.alt} />
          </a>
        ))}
      </section>
    </section>
  );
}

function ContactBar() {
  return (
    <section className="contact-bar" aria-label="联系信息">
      {contactItems.map((item) => (
        <article className="contact-item" key={item.title}>
          <span className="contact-icon" aria-hidden="true">
            {item.icon === "chat" && <ChatIcon />}
            {item.icon === "wechat" && <WechatIcon />}
            {item.icon === "phone" && <PhoneIcon />}
            {item.icon === "book" && <BookIcon />}
          </span>
          <span>
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
    <section className="page cases-page">
      <aside className="category-list" aria-label="作品分类">
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
      </aside>
      {hasCases ? (
        <section className="case-grid" aria-label="客户案例作品">
          {caseImages.map((image) => (
            <a href="#/detail" className="case-card" key={image.src}>
              <img src={image.src} alt={image.alt} />
            </a>
          ))}
        </section>
      ) : (
        <section className="case-empty" aria-label="暂无案例">
          <div className="case-empty-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <path d="M10 14h28v22H10z" />
              <path d="m16 30 6-7 5 5 3-3 6 7" />
              <circle cx="32" cy="20" r="2.5" />
            </svg>
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
    <section className="page about-page">
      <div className="about-hero">
        <img src={asset("about-hero.jpg")} alt="户外亲子家庭摄影场景" />
      </div>
      <article className="about-copy">
        <p>
          在快节奏的生活当中，我们总希望有些东西能够慢下来，让时间停留片刻。【温馨记忆】家庭摄影工作室正是这样一个地方——它不仅仅是一个拍照的空间，更是每个家庭故事开始的地方。自成立以来，我们致力于捕捉每一个家庭成员之间最真实、最自然的情感交流瞬间，通过镜头记录下爱与成长的故事。
        </p>
        <p>特色服务：</p>
        <p>1.家庭肖像：无论是三口之家还是四世同堂，我们都将精心布置场景，为您打造独一无二的家庭合影。</p>
        <p>
          儿童成长记：从宝宝的第一声啼哭到蹒跚学步，再到每一次重要的成长里程碑，我们的摄影师都会用专业的眼光和技巧记录下这些珍贵时刻。
        </p>
        <p>2.孕妇写真：怀孕是女性生命中一段特别而美好的时期，我们提供专业的孕妇拍摄服务，帮助准妈妈们留住这段难忘的经历。</p>
        <p>3.宠物家庭照：对于许多家庭来说，宠物也是不可或缺的一员。因此，我们也欢迎带上您的毛孩子一起来参加拍摄，共同创造更多美好回忆。</p>
        <p>团队介绍：</p>
        <p>
          由一群热爱生活、富有创造力的专业摄影师组成。每位成员都经过严格筛选，并接受过系统的培训，在光影运用、构图美学等方面有着深厚的造诣。更重要的是，他们擅长与客户沟通交流，能够准确把握客户需求，确保每一张照片都能达到甚至超越顾客预期。
        </p>
        <p>环境设施：</p>
        <p>
          工作室位于城市中心地带，交通便利。内部装修温馨舒适，设有多个不同风格的主题摄影棚供选择；同时配备了先进的摄影器材以及后期制作软件，保证了作品质量的同时也为顾客提供了良好的体验感。
        </p>
        <p>电话：[请根据实际情况填写]</p>
        <p>邮箱：[请根据实际情况填写]</p>
        <p>微信公众号/小程序：[请根据实际情况填写]</p>
        <p>加入我们吧！让我们一起用镜头定格那些平凡日子里不平凡的美好瞬间，为您的家庭留下永恒的记忆。</p>
      </article>
    </section>
  );
}

function DetailPage() {
  return (
    <section className="page detail-page">
      <header className="detail-title">
        <h1>快乐一周岁</h1>
        <p>这里是一句副文案啊啊啊啊啊哈哈哈</p>
      </header>
      <div className="detail-stack">
        <img src={asset("home-birthday.jpg")} alt="快乐一周岁生日照之一" />
        <img src={asset("home-birthday.jpg")} alt="快乐一周岁生日照之二" />
        <div className="detail-placeholder" aria-label="后续照片占位" />
      </div>
    </section>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M5 6.5h14v9H9.3L5 19v-3.5H5z" />
      <circle cx="9" cy="11" r="1.1" />
      <circle cx="12" cy="11" r="1.1" />
      <circle cx="15" cy="11" r="1.1" />
    </svg>
  );
}

function WechatIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M9.7 7.1c-3 0-5.4 1.9-5.4 4.3 0 1.4.8 2.6 2.1 3.4l-.4 1.7 1.9-1a6.9 6.9 0 0 0 1.8.2c3 0 5.4-1.9 5.4-4.3s-2.4-4.3-5.4-4.3Z" />
      <path d="M14.5 10.8c2.9.2 5.2 2 5.2 4.3 0 1.2-.7 2.4-1.8 3.2l.3 1.5-1.7-.8a7.1 7.1 0 0 1-1.6.2c-2.9 0-5.3-1.8-5.5-4.1" />
      <circle cx="7.8" cy="10.5" r=".8" />
      <circle cx="11.4" cy="10.5" r=".8" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M7.1 4.5 10 7.8 8.7 10c1.1 2.2 2.8 3.9 5.1 5.1l2.2-1.3 3.3 2.9-.7 2.8c-.2.8-.9 1.2-1.7 1.1-7.1-.9-12.7-6.5-13.5-13.5-.1-.8.4-1.5 1.1-1.7z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img">
      <path d="M6 4h9.2L18 7v13H6z" />
      <path d="M9 8h5M9 12h6M9 16h4" />
    </svg>
  );
}

export default App;
