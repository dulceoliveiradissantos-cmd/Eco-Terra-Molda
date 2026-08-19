import { type FormEvent, useEffect, useState } from 'react';
import terraMoldaLogo from '@assets/image_1787163531840.png';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Recycle,
  Send,
  Sprout,
  X,
} from 'lucide-react';

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  detail: string;
  color: string;
  accent: string;
  form: 'box' | 'cup' | 'tray';
};

const products: Product[] = [
  {
    id: 'embalagens',
    name: 'Embalagens que voltam',
    category: 'Para alimentos',
    description: 'Proteção leve para o que alimenta, feita para desaparecer no tempo certo.',
    detail: 'Nossas embalagens são moldadas com fibras vegetais e pensadas para substituir o plástico de uso único em operações de alimentação, varejo e delivery.',
    color: '#778d4f',
    accent: '#cdd59e',
    form: 'box',
  },
  {
    id: 'copos',
    name: 'Copos de fibra',
    category: 'Para servir',
    description: 'O ritual de servir fica mais bonito quando a escolha também cuida.',
    detail: 'Copos resistentes, confortáveis e compostáveis para cafés, eventos, restaurantes e marcas que desejam servir com presença.',
    color: '#bc7d55',
    accent: '#e4bf91',
    form: 'cup',
  },
  {
    id: 'bandejas',
    name: 'Bandejas naturais',
    category: 'Para apresentar',
    description: 'A textura da terra encontra a precisão do design para apresentar melhor.',
    detail: 'Bandejas moldadas para apresentação e transporte, com acabamento natural e uma segunda vida possível depois do uso.',
    color: '#9b6d4a',
    accent: '#dbc199',
    form: 'tray',
  },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#inicio"
      className="flex items-center no-underline"
      aria-label="Terra Molda, voltar ao início"
      data-testid="link-logo"
    >
      <img
        src={terraMoldaLogo}
        alt="Terra Molda — embalagens biodegradáveis"
        className={`h-[54px] w-[132px] object-contain object-left mix-blend-multiply ${light ? 'brightness-[1.25]' : ''}`}
      />
    </a>
  );
}

function ProductArtwork({ product }: { product: Product }) {
  return (
    <div className="product-art" style={{ background: product.color }}>
      <div
        className="absolute right-[-36px] top-[-46px] h-[210px] w-[210px] rounded-full opacity-30"
        style={{ background: product.accent }}
      />
      <div className="absolute bottom-[-80px] left-[-52px] h-[220px] w-[300px] rounded-[50%] bg-[#e9e2c9]/20" />
      <div className="leaf-stroke left-[18%] top-[32%] text-[#e8e4c8]" />
      <div className="leaf-stroke right-[19%] top-[12%] rotate-[-28deg] text-[#e8e4c8]" />
      {product.form === 'box' && (
        <div className="absolute bottom-[-5px] left-[22%] h-[142px] w-[205px] rotate-[-7deg] rounded-[8px] border border-[#f0ead4]/70 bg-[#e7dfc5] shadow-[14px_20px_0_rgba(46,61,32,.14)]">
          <div className="absolute inset-[13px] border border-[#9ba47a]/70" />
          <div className="absolute bottom-[29px] left-[32px] h-[5px] w-[62px] rounded-full bg-[#71844a]" />
          <div className="absolute bottom-[17px] left-[32px] h-[3px] w-[93px] rounded-full bg-[#b2b28e]" />
        </div>
      )}
      {product.form === 'cup' && (
        <div className="absolute bottom-[-12px] left-[34%] h-[190px] w-[132px] -rotate-[9deg] rounded-b-[32px] rounded-t-[13px] border border-[#f0ead4]/80 bg-[#ece5d0] shadow-[15px_18px_0_rgba(73,52,34,.18)]">
          <div className="absolute left-[12px] right-[12px] top-[18px] h-[1px] bg-[#b9ae93]" />
          <div className="absolute bottom-[43px] left-[26px] font-serif text-[31px] text-[#71844a]">tm</div>
          <div className="absolute bottom-[28px] left-[27px] h-[3px] w-[65px] rounded-full bg-[#b3ad91]" />
        </div>
      )}
      {product.form === 'tray' && (
        <div className="absolute bottom-[0px] left-[12%] h-[100px] w-[280px] rotate-[5deg] rounded-[28px] border-2 border-[#efe7ce]/70 bg-[#d9c49d] shadow-[10px_20px_0_rgba(68,46,28,.2)]">
          <div className="absolute inset-[13px] rounded-[17px] border border-[#a48a62]" />
          <div className="absolute left-[72px] top-[29px] h-[31px] w-[80px] rounded-[50%] border border-[#a48a62]" />
          <div className="absolute right-[44px] top-[31px] h-[24px] w-[43px] rounded-[50%] border border-[#a48a62]" />
        </div>
      )}
      <span className="absolute bottom-5 left-6 text-[11px] uppercase tracking-[.19em] text-[#f2ead4]/85">moldado pela natureza</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    document.title = 'Terra Molda | Escolhas que devolvem';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      'content',
      'Produtos biodegradáveis brasileiros para escolhas do dia a dia que deixam rastros mais leves.',
    );
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const updateForm = (field: keyof typeof form, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="page-shell bg-[#f1eedf]">
      <header className="absolute left-0 right-0 top-0 z-30">
        <div className="container-wide flex items-center justify-between border-b border-[#ded9c7] py-5">
          <Logo />
          <nav className="hidden items-center gap-9 md:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#manifesto" data-testid="link-manifesto">Manifesto</a>
            <a className="nav-link" href="#produtos" data-testid="link-produtos">Produtos</a>
            <a className="nav-link" href="#impacto" data-testid="link-impacto">Impacto</a>
            <a className="nav-link" href="#contato" data-testid="link-contato">Contato</a>
          </nav>
          <a className="button-primary hidden min-h-[42px] px-5 text-[12px] md:inline-flex" href="#contato" data-testid="link-header-cta">
            Vamos conversar <ArrowRight size={15} />
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d3cdb9] text-[#344d2b] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-navigation"
            className="container-wide mt-2 rounded-[22px] border border-[#d8d2bf] bg-[#f6f2e5] p-3 shadow-[0_18px_35px_rgba(55,64,39,.12)] md:hidden"
            aria-label="Navegação móvel"
          >
            {[
              ['Manifesto', '#manifesto', 'link-mobile-manifesto'],
              ['Produtos', '#produtos', 'link-mobile-produtos'],
              ['Impacto', '#impacto', 'link-mobile-impacto'],
              ['Contato', '#contato', 'link-mobile-contato'],
            ].map(([label, href, testId]) => (
              <a key={href} href={href} onClick={closeMenu} className="block rounded-[14px] px-4 py-3 text-[15px] text-[#4f5940] hover:bg-[#e8e5d4]" data-testid={testId}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="inicio" className="relative min-h-[710px] overflow-hidden pt-32 md:min-h-[780px] md:pt-40">
        <div className="absolute -right-28 top-[-120px] h-[570px] w-[570px] rounded-full bg-[#dce0b5]/70 md:h-[760px] md:w-[760px]" />
        <div className="absolute bottom-[-260px] left-[-170px] h-[440px] w-[610px] rounded-[50%] bg-[#dfc9a1]/60" />
        <div className="container-wide relative grid items-center gap-12 md:grid-cols-[1fr_430px] md:gap-20">
          <div className="max-w-[610px]">
            <div className="reveal flex items-center gap-3">
              <span className="h-px w-10 bg-[#788b4f]" />
              <span className="eyebrow">Biodegradável por natureza</span>
            </div>
            <h1 className="reveal reveal-delay-1 serif mt-7 text-[clamp(3.7rem,8vw,7.6rem)] leading-[.88] tracking-[-.065em] text-[#344d2b]">
              O futuro<br />
              <em className="text-[#9a6946]">começa</em> no<br />
              cotidiano.
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[430px] text-[17px] leading-[1.6] text-[#686451]">
              Criamos produtos que cumprem seu papel hoje e sabem voltar para a terra amanhã.
              Porque toda escolha pode deixar um rastro mais leve.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-6">
              <a href="#produtos" className="button-primary" data-testid="link-hero-products">
                Conheça nossas soluções <ArrowDownRight size={16} />
              </a>
              <a href="#manifesto" className="button-quiet" data-testid="link-hero-story">
                Nossa história <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[390px] w-full max-w-[430px] md:h-[520px]">
            <div className="organic-orb absolute inset-[7%_4%_4%_8%] rotate-[-8deg] bg-[#526d43]" />
            <div className="organic-orb absolute inset-[12%_13%_15%_14%] rotate-[13deg] bg-[#839758]" />
            <div className="absolute inset-[21%_20%_21%_20%] rotate-[-8deg] rounded-[46%_54%_46%_54%] border border-[#d8dda8] bg-[#d2d59b]" />
            <div className="absolute bottom-[13%] left-[31%] h-[205px] w-[130px] rotate-[10deg] rounded-[49%_51%_28%_29%] border border-[#ede7ce] bg-[#b8825b] shadow-[18px_22px_0_rgba(62,67,39,.22)] md:h-[270px] md:w-[170px]">
              <div className="absolute left-[15%] right-[15%] top-[13%] h-px bg-[#efd9b6]/60" />
              <div className="absolute bottom-[27%] left-[25%] font-serif text-[49px] tracking-[-.1em] text-[#ede6c6]">tm</div>
              <div className="absolute bottom-[18%] left-[25%] h-px w-[48%] bg-[#ede6c6]/70" />
            </div>
            <div className="absolute left-[3%] top-[29%] h-[100px] w-[56px] rotate-[-38deg] rounded-[100%_0_100%_0] border-l border-t border-[#e3e6bd]/70" />
            <div className="absolute right-[3%] top-[19%] h-[85px] w-[47px] rotate-[45deg] rounded-[100%_0_100%_0] border-r border-t border-[#e3e6bd]/70" />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[.26em] text-[#f1eedf]/75">da terra para a vida</span>
          </div>
        </div>
        <a href="#manifesto" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[.22em] text-[#7d8067] md:flex" data-testid="link-scroll-manifesto">
          desça para descobrir <ChevronDown size={15} />
        </a>
      </section>

      <section id="manifesto" className="relative bg-[#344d2b] py-24 text-[#f1eedf] md:py-36">
        <div className="container-wide grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-28">
          <div>
            <span className="eyebrow text-[#cbd58e]">01 / Um jeito de fazer</span>
            <div className="mt-7 flex items-start gap-4 text-[#cbd58e]">
              <Leaf size={25} strokeWidth={1.4} />
              <span className="max-w-[170px] text-[13px] leading-[1.5]">O que é bom para a terra também pode ser bom para o negócio.</span>
            </div>
          </div>
          <div>
            <h2 className="serif max-w-[750px] text-[clamp(2.7rem,5.7vw,5.7rem)] leading-[.97] tracking-[-.055em]">
              Menos coisa<br />
              <span className="text-[#c9d68f]">descartada.</span><br />
              Mais futuro compartilhado.
            </h2>
            <p className="mt-9 max-w-[580px] text-[16px] leading-[1.75] text-[#d8dcc5]">
              A Terra não precisa de mais objetos que duram para sempre. Precisa de escolhas
              inteligentes, feitas de matéria que conhece o caminho de volta. A Terra Molda nasce
              para redesenhar esse percurso — do resíduo vegetal ao produto, do produto ao solo.
            </p>
            <div className="mt-12 grid max-w-[640px] gap-8 border-t border-[#70805a] pt-7 sm:grid-cols-3">
              <div>
                <Sprout size={22} className="mb-4 text-[#cbd58e]" strokeWidth={1.5} />
                <strong className="block text-[15px]">Origem consciente</strong>
                <span className="mt-2 block text-[13px] leading-[1.45] text-[#c4cbb1]">Fibras vegetais que já existem no mundo.</span>
              </div>
              <div>
                <Recycle size={22} className="mb-4 text-[#cbd58e]" strokeWidth={1.5} />
                <strong className="block text-[15px]">Ciclo possível</strong>
                <span className="mt-2 block text-[13px] leading-[1.45] text-[#c4cbb1]">Produtos feitos para não virar um ponto final.</span>
              </div>
              <div>
                <Package size={22} className="mb-4 text-[#cbd58e]" strokeWidth={1.5} />
                <strong className="block text-[15px]">Design presente</strong>
                <span className="mt-2 block text-[13px] leading-[1.45] text-[#c4cbb1]">Soluções bonitas porque cuidar também é uma experiência.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className="bg-[#f1eedf] py-24 md:py-32">
        <div className="container-wide">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow">02 / O que moldamos</span>
              <h2 className="serif mt-4 max-w-[570px] text-[clamp(2.8rem,5vw,5.3rem)] leading-[.96] tracking-[-.055em] text-[#344d2b]">
                Soluções para o agora. <em className="text-[#9a6946]">Respeito</em> para depois.
              </h2>
            </div>
            <p className="max-w-[265px] text-[14px] leading-[1.6] text-[#777361] md:mb-2">
              Para marcas, operações e pessoas que entendem que a embalagem também comunica valores.
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-[1.15fr_1fr_1fr]">
            {products.map((product, index) => (
              <article key={product.id} className={`product-card ${index === 0 ? 'md:mt-12' : index === 2 ? 'md:mt-[-4px]' : ''}`} data-testid={`card-product-${product.id}`}>
                <ProductArtwork product={product} />
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[.16em] text-[#8b8069]">{product.category}</span>
                    <h3 className="serif mt-2 text-[27px] leading-none tracking-[-.04em] text-[#344d2b]">{product.name}</h3>
                    <p className="mt-3 max-w-[235px] text-[13px] leading-[1.45] text-[#706c5c]">{product.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bcb89f] text-[#344d2b] transition hover:border-[#344d2b] hover:bg-[#344d2b] hover:text-[#f1eedf]"
                    aria-label={`Ver detalhes de ${product.name}`}
                    data-testid={`button-product-details-${product.id}`}
                  >
                    <ArrowUpRightIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#d9d3bf] pt-6">
            <span className="text-[13px] text-[#777361]">Ainda não encontrou o formato ideal?</span>
            <a href="#contato" className="button-quiet" data-testid="link-custom-solution">
              Fale com nosso time de soluções <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <section id="impacto" className="relative overflow-hidden bg-[#966b4b] py-24 text-[#f5efdc] md:py-32">
        <div className="absolute -right-40 top-[-160px] h-[490px] w-[490px] rounded-full border border-[#d9c7a6]/25" />
        <div className="absolute -right-14 top-[-80px] h-[350px] w-[350px] rounded-full border border-[#d9c7a6]/25" />
        <div className="container-wide relative">
          <div className="grid gap-14 md:grid-cols-[.8fr_1.2fr] md:gap-28">
            <div>
              <span className="eyebrow text-[#e1d4b3]">03 / O rastro que deixamos</span>
              <h2 className="serif mt-6 max-w-[370px] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-[-.055em]">
                Impacto se mede no que <em>permanece.</em>
              </h2>
              <p className="mt-7 max-w-[340px] text-[15px] leading-[1.65] text-[#f0e4ca]">
                Cada produto é uma pequena decisão coletiva. A soma delas muda o lugar onde vamos viver.
              </p>
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <div className="serif text-[clamp(3.3rem,6vw,6rem)] leading-none tracking-[-.07em] text-[#e6e0aa]">18,4 t</div>
                <div className="impact-line mt-5" />
                <p className="mt-4 max-w-[220px] text-[13px] leading-[1.5] text-[#f0e4ca]">de plástico descartável evitado por nossos parceiros.</p>
              </div>
              <div className="sm:mt-20">
                <div className="serif text-[clamp(3.3rem,6vw,6rem)] leading-none tracking-[-.07em] text-[#e6e0aa]">100%</div>
                <div className="impact-line mt-5" />
                <p className="mt-4 max-w-[220px] text-[13px] leading-[1.5] text-[#f0e4ca]">dos nossos materiais são de origem vegetal.</p>
              </div>
              <div>
                <div className="serif text-[clamp(3.3rem,6vw,6rem)] leading-none tracking-[-.07em] text-[#e6e0aa]">27</div>
                <div className="impact-line mt-5" />
                <p className="mt-4 max-w-[220px] text-[13px] leading-[1.5] text-[#f0e4ca]">negócios brasileiros construindo ciclos com a gente.</p>
              </div>
              <div className="sm:mt-20">
                <div className="serif text-[clamp(3.3rem,6vw,6rem)] leading-none tracking-[-.07em] text-[#e6e0aa]">01</div>
                <div className="impact-line mt-5" />
                <p className="mt-4 max-w-[220px] text-[13px] leading-[1.5] text-[#f0e4ca]">compromisso: deixar o mundo mais inteiro.</p>
              </div>
            </div>
          </div>
          <div className="mt-20 flex items-center gap-3 border-t border-[#c19a77] pt-5 text-[11px] uppercase tracking-[.17em] text-[#eadcbe]">
            <span className="h-2 w-2 rounded-full bg-[#d4df9d]" />
            Dados acompanhados desde 2021, com transparência e pés no chão.
          </div>
        </div>
      </section>

      <section className="bg-[#e3dbc5] py-24 md:py-32">
        <div className="container-wide grid gap-14 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-28">
          <div className="relative h-[390px] overflow-hidden rounded-[42%_58%_54%_46%] bg-[#d0d49c]">
            <div className="absolute left-[16%] top-[14%] h-[260px] w-[260px] rounded-full border border-[#849459]/45" />
            <div className="absolute left-[28%] top-[25%] h-[210px] w-[210px] rounded-full border border-[#849459]/45" />
            <div className="absolute left-[40%] top-[38%] h-[150px] w-[150px] rounded-full border border-[#849459]/45" />
            <div className="absolute bottom-[-15px] right-[16%] h-[215px] w-[120px] rotate-[18deg] rounded-[48%_52%_30%_30%] bg-[#9e704e] shadow-[-12px_15px_0_rgba(63,72,39,.12)]" />
            <div className="absolute bottom-[54px] right-[30%] h-[70px] w-[62px] rounded-[100%_0_100%_0] border-l border-t border-[#577144]" />
            <span className="absolute bottom-9 left-9 text-[10px] uppercase tracking-[.24em] text-[#5e7042]">matéria em movimento</span>
          </div>
          <div>
            <span className="eyebrow">04 / Como fazemos</span>
            <h2 className="serif mt-6 text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-[-.055em] text-[#344d2b]">
              A natureza não é só inspiração. É <em className="text-[#9a6946]">matéria-prima.</em>
            </h2>
            <div className="mt-10 space-y-7">
              {[
                ['01', 'A gente observa', 'Encontramos fibras e resíduos vegetais locais com potencial para voltar a circular.'],
                ['02', 'A gente molda', 'Tecnologia e cuidado transformam matéria simples em soluções precisas e bonitas.'],
                ['03', 'A gente acompanha', 'Medimos o impacto e ajudamos sua operação a escolher melhor, em cada detalhe.'],
              ].map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[42px_1fr] gap-4 border-t border-[#c9c2a8] pt-5">
                  <span className="text-[11px] font-bold tracking-[.13em] text-[#9a6946]">{number}</span>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#344d2b]">{title}</h3>
                    <p className="mt-2 max-w-[410px] text-[14px] leading-[1.55] text-[#706c5c]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="bg-[#f1eedf] py-24 md:py-32">
        <div className="container-wide grid gap-14 md:grid-cols-[.86fr_1.14fr] md:gap-28">
          <div>
            <span className="eyebrow">05 / Vamos começar</span>
            <h2 className="serif mt-6 max-w-[460px] text-[clamp(3rem,5.6vw,5.8rem)] leading-[.92] tracking-[-.06em] text-[#344d2b]">
              Uma boa escolha pede <em className="text-[#9a6946]">companhia.</em>
            </h2>
            <p className="mt-8 max-w-[375px] text-[16px] leading-[1.65] text-[#706c5c]">
              Conte o que sua marca precisa. A gente pensa junto em um jeito mais responsável de fazer acontecer.
            </p>
            <div className="mt-10 space-y-4 text-[13px] text-[#5c604a]">
              <a href="mailto:oi@terramolda.com.br" className="flex items-center gap-3 hover:text-[#344d2b]" data-testid="link-email">
                <Mail size={16} className="text-[#778d4f]" /> oi@terramolda.com.br
              </a>
              <a href="tel:+551132301840" className="flex items-center gap-3 hover:text-[#344d2b]" data-testid="link-phone">
                <Phone size={16} className="text-[#778d4f]" /> +55 11 3230 1840
              </a>
              <span className="flex items-center gap-3"><MapPin size={16} className="text-[#778d4f]" /> São Paulo, Brasil</span>
            </div>
          </div>
          <div className="rounded-[28px] bg-[#e5dfcc] p-6 sm:p-9">
            {submitted ? (
              <div className="flex min-h-[370px] flex-col items-start justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#cbd58e] text-[#344d2b]">
                  <Check size={25} />
                </div>
                <h3 className="serif mt-7 text-[38px] leading-none tracking-[-.04em] text-[#344d2b]">Recebemos sua mensagem.</h3>
                <p className="mt-5 max-w-[350px] text-[15px] leading-[1.6] text-[#706c5c]">Obrigado por abrir essa conversa. Nosso time retorna em breve para imaginar os próximos passos com você.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="button-quiet mt-7" data-testid="button-new-message">Enviar outra mensagem <ArrowRight size={16} /></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulário de contato">
                <div>
                  <label htmlFor="name" className="mb-2 block text-[12px] font-bold text-[#4d5940]">Seu nome</label>
                  <input id="name" required value={form.name} onChange={(event) => updateForm('name', event.target.value)} className="w-full border-b border-[#bcb89f] bg-transparent px-0 py-3 text-[16px] text-[#344d2b] placeholder:text-[#a09a85] focus:border-[#526d43] focus:outline-none" placeholder="Como podemos te chamar?" data-testid="input-name" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-[12px] font-bold text-[#4d5940]">Seu e-mail</label>
                  <input id="email" type="email" required value={form.email} onChange={(event) => updateForm('email', event.target.value)} className="w-full border-b border-[#bcb89f] bg-transparent px-0 py-3 text-[16px] text-[#344d2b] placeholder:text-[#a09a85] focus:border-[#526d43] focus:outline-none" placeholder="voce@empresa.com.br" data-testid="input-email" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-[12px] font-bold text-[#4d5940]">O que você tem em mente?</label>
                  <textarea id="message" required rows={3} value={form.message} onChange={(event) => updateForm('message', event.target.value)} className="w-full resize-none border-b border-[#bcb89f] bg-transparent px-0 py-3 text-[16px] text-[#344d2b] placeholder:text-[#a09a85] focus:border-[#526d43] focus:outline-none" placeholder="Fale um pouco sobre seu desafio..." data-testid="input-message" />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
                  <span className="max-w-[220px] text-[11px] leading-[1.45] text-[#8a836f]">Ao enviar, você concorda com nossa política de privacidade.</span>
                  <button type="submit" className="button-primary" data-testid="button-submit-contact">Enviar mensagem <Send size={15} /></button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#273b25] py-10 text-[#e6e4c8]">
        <div className="container-wide flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Logo light />
            <p className="mt-5 max-w-[260px] text-[12px] leading-[1.5] text-[#bfc9ac]">Escolhas do presente, com cuidado pelo que vem depois.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] text-[#c8d0b6]">
            <a href="#manifesto" className="hover:text-[#e5e6c8]" data-testid="link-footer-manifesto">Manifesto</a>
            <a href="#produtos" className="hover:text-[#e5e6c8]" data-testid="link-footer-products">Produtos</a>
            <a href="#impacto" className="hover:text-[#e5e6c8]" data-testid="link-footer-impact">Impacto</a>
            <a href="#contato" className="hover:text-[#e5e6c8]" data-testid="link-footer-contact">Contato</a>
          </div>
          <span className="text-[11px] text-[#96a582]">© 2024 Terra Molda</span>
        </div>
      </footer>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#24331f]/70 p-5 backdrop-blur-sm" role="presentation" onClick={() => setSelectedProduct(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="product-dialog-title" className="relative w-full max-w-[520px] overflow-hidden rounded-[28px] bg-[#f1eedf] shadow-[0_28px_70px_rgba(20,30,15,.3)]" onClick={(event) => event.stopPropagation()}>
            <ProductArtwork product={selectedProduct} />
            <button type="button" onClick={() => setSelectedProduct(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1eedf]/90 text-[#344d2b] hover:bg-[#fffbed]" aria-label="Fechar detalhes do produto" data-testid="button-close-product">
              <X size={18} />
            </button>
            <div className="p-7 sm:p-9">
              <span className="eyebrow">{selectedProduct.category}</span>
              <h2 id="product-dialog-title" className="serif mt-3 text-[39px] leading-none tracking-[-.05em] text-[#344d2b]">{selectedProduct.name}</h2>
              <p className="mt-5 text-[15px] leading-[1.65] text-[#706c5c]">{selectedProduct.detail}</p>
              <a href="#contato" onClick={() => setSelectedProduct(null)} className="button-primary mt-7" data-testid="link-product-contact">Quero falar sobre este produto <ArrowRight size={15} /></a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={17} className="rotate-[-45deg]" />;
}

export default App;