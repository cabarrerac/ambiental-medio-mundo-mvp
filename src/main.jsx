const { useEffect, useMemo, useState } = React;

function MaterialIcon({ name, size = 22, filled = false }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

const makeIcon = (name, filled = false) => ({ size = 22 }) => <MaterialIcon name={name} size={size} filled={filled} />;

const Activity = makeIcon('monitoring');
const AlertTriangle = makeIcon('warning');
const ArrowRight = makeIcon('arrow_forward');
const BarChart3 = makeIcon('analytics');
const Bell = makeIcon('notifications');
const BriefcaseBusiness = makeIcon('business_center');
const Check = makeIcon('check');
const CheckCircle2 = makeIcon('check_circle', true);
const ClipboardList = makeIcon('clinical_notes');
const Download = makeIcon('download');
const Droplets = makeIcon('water_drop');
const FileText = makeIcon('description');
const FlaskConical = makeIcon('science');
const Gauge = makeIcon('speed');
const HelpCircle = makeIcon('help');
const Home = makeIcon('home', true);
const Leaf = makeIcon('eco', true);
const LogOut = makeIcon('logout');
const MapPin = makeIcon('location_on');
const Menu = makeIcon('menu');
const Package = makeIcon('inventory_2');
const PlayCircle = makeIcon('play_circle', true);
const Plus = makeIcon('add');
const QrCode = makeIcon('qr_code_scanner');
const Recycle = makeIcon('recycling');
const Route = makeIcon('route');
const Search = makeIcon('search');
const Settings = makeIcon('settings');
const ShieldCheck = makeIcon('health_and_safety');
const Truck = makeIcon('local_shipping', true);
const UserCircle = makeIcon('account_circle');
const Users = makeIcon('group');
const WalletCards = makeIcon('payments');
const X = makeIcon('close');

const SUPABASE_URL = 'https://gnrxaxpwkscfwbuskekb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImducnhheHB3a3NjZndidXNrZWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5OTIyMzAsImV4cCI6MjA5NTU2ODIzMH0.E078wlvi0IHCJvfRzQdxQoG51O1LYgqMNRzrXWcv2fQ';
const supabaseClient = window.supabase?.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const roles = {
  admin: 'Administrador',
  client: 'Cliente',
  driver: 'Transportista'
};

const demoCredentials = {
  admin: { email: 'admin@ambiental.demo', password: 'Ambiental2026!' },
  client: { email: 'cliente@ambiental.demo', password: 'Ambiental2026!' },
  driver: { email: 'conductor@ambiental.demo', password: 'Ambiental2026!' }
};

const routeStops = [
  { name: 'Clínica San Juan de Dios', address: 'Cra. 10 #18-75, Bogotá', status: 'Actual' },
  { name: 'Laboratorio Norte', address: 'Calle 127 #19-22, Bogotá', status: 'Pendiente' },
  { name: 'Centro Médico Cedritos', address: 'Av. 9 #146-60, Bogotá', status: 'Pendiente' }
];

const manifests = [
  { id: 'MNF-2408', client: 'Clínica San Juan de Dios', type: 'Biosanitarios', weight: '245 kg', status: 'Certificado', date: '28 May' },
  { id: 'MNF-2407', client: 'Laboratorio Norte', type: 'Químicos', weight: '82 L', status: 'En tránsito', date: '27 May' },
  { id: 'MNF-2406', client: 'Hotel Capital', type: 'Aprovechables', weight: '390 kg', status: 'Pendiente', date: '26 May' }
];

const pickups = [
  { code: 'RTA-BOG-409', zone: 'Zona Norte - Hospitales', driver: 'Laura Mendoza', stops: 12, progress: 66 },
  { code: 'RTA-BOG-412', zone: 'Chapinero - Restaurantes', driver: 'Carlos Rojas', stops: 9, progress: 38 },
  { code: 'RTA-BOG-421', zone: 'Puente Aranda - Industrial', driver: 'Mateo Ruiz', stops: 7, progress: 84 }
];

const wasteTypes = [
  { label: 'Biosanitarios', icon: ShieldCheck, rate: 2400 },
  { label: 'Químicos', icon: FlaskConical, rate: 3200 },
  { label: 'Cortopunzantes', icon: AlertTriangle, rate: 2800 },
  { label: 'Reciclables', icon: Recycle, rate: 900 }
];

function IconButton({ children, label, onClick }) {
  return (
    <button className="icon-button" aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  );
}

function Brand({ compact = false }) {
  return (
    <div className="brand">
      <span className="brand-mark"><Leaf size={compact ? 18 : 22} /></span>
      {!compact && <span>Ambiental Medio Mundo</span>}
    </div>
  );
}

function App() {
  const [page, setPage] = useState('landing');
  const [role, setRole] = useState('admin');
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [remoteData, setRemoteData] = useState({ routes: pickups, manifests, routeStops });
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [page]);

  useEffect(() => {
    if (!supabaseClient) return;
    supabaseClient.auth.getSession().then(({ data }) => {
      if (data.session) hydrateSession(data.session);
    });
    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (nextSession) hydrateSession(nextSession);
      if (!nextSession) {
        setProfile(null);
        setRemoteData({ routes: pickups, manifests, routeStops });
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function hydrateSession(nextSession) {
    setSession(nextSession);
    const { data: profileRow } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', nextSession.user.id)
      .maybeSingle();
    if (profileRow) {
      setProfile(profileRow);
      setRole(profileRow.role);
    }
    await loadRemoteData();
  }

  async function loadRemoteData() {
    if (!supabaseClient) return;
    const [{ data: routesData }, { data: manifestsData }, { data: stopsData }] = await Promise.all([
      supabaseClient.from('routes').select('*').order('code'),
      supabaseClient.from('manifests').select('*, clients(name)').order('collected_at', { ascending: false }),
      supabaseClient.from('route_stops').select('*').order('stop_order')
    ]);

    setRemoteData({
      routes: routesData?.map((route) => ({
        id: route.id,
        code: route.code,
        zone: route.zone,
        driver: route.driver_name,
        stops: stopsData?.filter((stop) => stop.route_id === route.id).length || 0,
        progress: route.progress
      })) || pickups,
      manifests: manifestsData?.map((manifest) => ({
        id: manifest.id,
        client: manifest.clients?.name || 'Cliente',
        type: manifest.waste_type,
        weight: `${Number(manifest.quantity).toLocaleString('es-CO')} ${manifest.unit}`,
        status: normalizeStatus(manifest.status),
        date: new Date(manifest.collected_at).toLocaleDateString('es-CO', { day: '2-digit', month: 'short' })
      })) || manifests,
      routeStops: stopsData?.map((stop) => ({ name: stop.name, address: stop.address, status: stop.status })) || routeStops
    });
  }

  async function signIn(email, password) {
    setAuthError('');
    if (!supabaseClient) {
      setAuthError('Supabase no cargó en el navegador. Revisa la conexión.');
      return;
    }
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      return;
    }
    await hydrateSession(data.session);
    const nextRole = data.user.user_metadata?.role || role;
    setRole(nextRole);
    setPage(nextRole === 'driver' ? 'driver' : nextRole === 'client' ? 'client' : 'admin');
  }

  async function signOut() {
    if (supabaseClient) await supabaseClient.auth.signOut();
    setSession(null);
    setProfile(null);
    setPage('landing');
  }

  async function completeManifest(payload) {
    if (!supabaseClient || !session) return { error: 'Debes iniciar sesión para guardar el manifiesto.' };
    const manifestId = `MNF-${Math.floor(1000 + Math.random() * 8999)}`;
    const { error } = await supabaseClient.from('manifests').insert({
      id: manifestId,
      client_id: '11111111-1111-4111-8111-111111111111',
      route_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      waste_type: payload.wasteType,
      quantity: payload.quantity,
      unit: 'kg',
      amount_cop: payload.amount,
      status: 'certified',
      created_by: session.user.id
    });
    if (!error) await loadRemoteData();
    return { error: error?.message, id: manifestId };
  }

  const goWorkspace = (nextRole = role) => {
    if (!session) {
      setRole(nextRole);
      setPage('login');
      return;
    }
    setRole(nextRole);
    setPage(nextRole === 'driver' ? 'driver' : nextRole === 'client' ? 'client' : 'admin');
    setMenuOpen(false);
  };

  const nav = { page, setPage, role, setRole, goWorkspace, menuOpen, setMenuOpen, signIn, signOut, session, profile, authError };

  if (page === 'landing') return <Landing nav={nav} />;
  if (page === 'login') return <Login nav={nav} />;
  if (page === 'driver') return <DriverApp nav={nav} data={remoteData} onCompleteManifest={completeManifest} />;
  return (
    <AppShell nav={nav}>
      {page === 'client' ? <ClientPortal data={remoteData} /> : <AdminDashboard data={remoteData} />}
    </AppShell>
  );
}

function normalizeStatus(status) {
  return {
    certified: 'Certificado',
    in_transit: 'En tránsito',
    pending: 'Pendiente'
  }[status] || status;
}

function Landing({ nav }) {
  return (
    <div className="landing">
      <header className="topbar">
        <Brand />
        <nav className="desktop-links">
          <a href="#ecosistema">Ecosistema</a>
          <a href="#metricas">Beneficios</a>
          <a href="#operacion">Operación</a>
        </nav>
        <div className="topbar-actions">
          <IconButton label="Buscar"><Search size={19} /></IconButton>
          <button className="button ghost" onClick={() => nav.setPage('login')}>Ingresar</button>
          <button className="button primary" onClick={() => nav.setPage('login')}>Comenzar</button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow"><Activity size={16} /> Logística inteligente 2.0</span>
            <h1>Gestión de residuos transparente y eficiente</h1>
            <p>Plataforma integral para empresas, transportistas y administradores. Optimiza rutas, centraliza manifiestos y garantiza trazabilidad de extremo a extremo.</p>
            <div className="hero-actions">
              <button className="button primary large" onClick={() => nav.setPage('login')}>Solicitar demo <ArrowRight size={18} /></button>
              <button className="button outline large" onClick={() => nav.goWorkspace('admin')}>Ver MVP <PlayCircle size={18} /></button>
            </div>
          </div>
          <div className="hero-visual" aria-label="Vista operativa de recolección">
            <div className="route-map">
              <div className="map-line" />
              {routeStops.map((stop, index) => (
                <div className={`map-stop stop-${index + 1}`} key={stop.name}>
                  <span>{index + 1}</span>
                  <strong>{stop.name}</strong>
                </div>
              ))}
            </div>
            <div className="floating-stat">
              <Gauge size={26} />
              <div>
                <span>Eficiencia de ruta</span>
                <strong>+34%</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="module-grid" id="ecosistema">
          <ModuleCard icon={BriefcaseBusiness} title="Portal Clientes" text="Solicitudes, manifiestos digitales, certificados y métricas de impacto en un solo lugar." />
          <ModuleCard icon={Truck} title="App Transportistas" text="Ruta asignada, captura de peso, método de pago y firmas digitales desde móvil." featured />
          <ModuleCard icon={BarChart3} title="Centro de Comando" text="KPIs, asignación de flota, cumplimiento y monitoreo operativo para administradores." />
        </section>
      </main>
    </div>
  );
}

function ModuleCard({ icon: Icon, title, text, featured = false }) {
  return (
    <article className={`card module-card ${featured ? 'featured' : ''}`}>
      <div className="module-icon"><Icon size={28} /></div>
      <h2>{title}</h2>
      <p>{text}</p>
      <span className="check-row"><CheckCircle2 size={17} /> MVP incluido</span>
    </article>
  );
}

function Login({ nav }) {
  const [selectedRole, setSelectedRole] = useState(nav.role);
  const [email, setEmail] = useState(demoCredentials[nav.role].email);
  const [password, setPassword] = useState(demoCredentials[nav.role].password);

  function chooseRole(key) {
    setSelectedRole(key);
    setEmail(demoCredentials[key].email);
    setPassword(demoCredentials[key].password);
  }

  function submit(event) {
    event.preventDefault();
    nav.signIn(email, password);
  }

  return (
    <main className="login-page">
      <section className="login-aside">
        <Brand />
        <div>
          <h1>Logística de precisión. Impacto restaurativo.</h1>
          <p>Un MVP para operar solicitudes, rutas, manifiestos y certificados con trazabilidad clara.</p>
        </div>
      </section>
      <section className="login-panel">
        <button className="text-button back" onClick={() => nav.setPage('landing')}>Volver al inicio</button>
        <div className="login-card">
          <Brand compact />
          <h2>Bienvenido de nuevo</h2>
          <p>Selecciona un rol para entrar a la experiencia del MVP.</p>
          <div className="role-switcher">
            {Object.entries(roles).map(([key, label]) => (
              <button className={selectedRole === key ? 'active' : ''} key={key} onClick={() => chooseRole(key)} type="button">{label}</button>
            ))}
          </div>
          <form onSubmit={submit}>
            <label>Correo electrónico<input onChange={(event) => setEmail(event.target.value)} type="email" value={email} /></label>
            <label>Contraseña<input onChange={(event) => setPassword(event.target.value)} type="password" value={password} /></label>
            {nav.authError && <p className="form-error">{nav.authError}</p>}
            <button className="button primary full" type="submit">Iniciar sesión <ArrowRight size={18} /></button>
          </form>
        </div>
      </section>
    </main>
  );
}

function AppShell({ children, nav }) {
  const items = [
    ['admin', 'Centro de comando', Home],
    ['client', 'Portal cliente', BriefcaseBusiness],
    ['driver', 'Modo ruta', Truck]
  ];

  return (
    <div className="app-layout">
      <aside className={`sidebar ${nav.menuOpen ? 'open' : ''}`}>
        <div className="sidebar-head">
          <Brand />
          <button className="close-menu" onClick={() => nav.setMenuOpen(false)}><X size={18} /></button>
        </div>
        <button className="button primary full"><Plus size={18} /> Nueva solicitud</button>
        <nav>
          {items.map(([key, label, Icon]) => (
            <button className={nav.page === key ? 'active' : ''} key={key} onClick={() => nav.goWorkspace(key)}>
              <Icon size={19} /> {label}
            </button>
          ))}
          <button><ClipboardList size={19} /> Manifiestos</button>
          <button><Users size={19} /> Clientes</button>
          <button><Settings size={19} /> Configuración</button>
          <button><HelpCircle size={19} /> Soporte</button>
        </nav>
      </aside>
      <div className="workspace">
        <header className="workspace-topbar">
          <IconButton label="Abrir menú" onClick={() => nav.setMenuOpen(true)}><Menu size={21} /></IconButton>
          <div className="searchbox"><Search size={18} /><input placeholder="Buscar manifiestos, clientes o rutas" /></div>
          <div className="workspace-actions">
            <IconButton label="Notificaciones"><Bell size={19} /></IconButton>
            <button className="role-pill" onClick={() => nav.setPage('login')}><UserCircle size={18} /> {roles[nav.role]}</button>
            <IconButton label="Salir" onClick={nav.signOut}><LogOut size={19} /></IconButton>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

function AdminDashboard({ data }) {
  const activeRoutes = data.routes || pickups;
  const activeManifests = data.manifests || manifests;
  const collectedKg = activeManifests.reduce((sum, item) => sum + (parseFloat(String(item.weight).replace(',', '.')) || 0), 0);
  return (
    <main className="page-content">
      <PageHeading title="Centro de Comando" subtitle="Vista general de operaciones y logística de residuos en Bogotá." action="Nuevo manifiesto" />
      <section className="kpi-grid">
        <Kpi icon={WalletCards} label="Ingresos totales" value="$45.2M COP" trend="+12.5%" />
        <Kpi icon={Package} label="Residuos recolectados" value={`${collectedKg.toLocaleString('es-CO')} kg`} trend="+8.2%" />
        <Kpi icon={Truck} label="Rutas activas" value={activeRoutes.length} trend="+6.1%" />
        <Kpi icon={ShieldCheck} label="Cumplimiento" value="98.4%" trend="estable" />
      </section>
      <section className="dashboard-grid">
        <div className="card map-card">
          <div className="section-title"><Route size={22} /><h2>Rutas en vivo</h2></div>
          <div className="mini-map">
            {activeRoutes.map((pickup, index) => <span className={`pin pin-${index}`} key={pickup.code}>{index + 1}</span>)}
          </div>
        </div>
        <div className="card">
          <div className="section-title"><Activity size={22} /><h2>Operación de hoy</h2></div>
          <div className="route-list">
            {activeRoutes.map((pickup) => (
              <article key={pickup.code}>
                <div>
                  <strong>{pickup.code}</strong>
                  <span>{pickup.zone} · {pickup.driver}</span>
                </div>
                <Progress value={pickup.progress} />
              </article>
            ))}
          </div>
        </div>
      </section>
      <ManifestTable admin manifests={activeManifests} />
    </main>
  );
}

function ClientPortal({ data }) {
  const activeManifests = data.manifests || manifests;
  return (
    <main className="page-content">
      <PageHeading title="Hola, Cliente Eco" subtitle="Resumen de impacto ambiental, solicitudes y certificados recientes." action="Solicitar recolección" />
      <section className="client-grid">
        <div className="card impact-card">
          <Recycle size={120} />
          <span>Mis métricas ambientales</span>
          <strong>1,245 kg</strong>
          <p>12% más que el mes anterior</p>
        </div>
        <Kpi icon={Droplets} label="Líquidos peligrosos" value="320 L" trend="certificados" />
        <Kpi icon={FlaskConical} label="Biológicos" value="85 kg" trend="en custodia" />
      </section>
      <ManifestTable manifests={activeManifests} />
    </main>
  );
}

function DriverApp({ nav, data, onCompleteManifest }) {
  const [waste, setWaste] = useState(wasteTypes[0]);
  const [weight, setWeight] = useState(15.5);
  const [payment, setPayment] = useState('PSE / Nequi');
  const [saveStatus, setSaveStatus] = useState('');
  const total = useMemo(() => 42000 + Math.max(Number(weight || 0) - 10, 0) * waste.rate, [weight, waste]);
  const route = data.routes?.[0] || pickups[0];
  const nextStop = data.routeStops?.[0] || routeStops[0];

  async function complete() {
    setSaveStatus('Guardando manifiesto...');
    const result = await onCompleteManifest({ wasteType: waste.label, quantity: Number(weight || 0), amount: Math.round(total) });
    setSaveStatus(result.error ? `Error: ${result.error}` : `Manifiesto ${result.id} guardado en Supabase`);
  }

  return (
    <div className="driver-shell">
      <header className="driver-header">
        <div><Truck size={25} /><strong>Modo Ruta</strong></div>
        <span className="sync"><Activity size={15} /> Sincronizando...</span>
      </header>
      <main className="driver-content">
        <section className="card route-card">
          <div>
            <span className="eyebrow">RTA-BOG-409</span>
            <h1>{route.zone}</h1>
            <p><MapPin size={16} /> {nextStop.name} · {nextStop.address}</p>
          </div>
          <button className="button primary full"><PlayCircle size={18} /> Iniciar recorrido en punto</button>
        </section>
        <section className="card">
          <StepTitle number="1" title="Tipo y peso" />
          <div className="waste-grid">
            {wasteTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button className={waste.label === type.label ? 'selected' : ''} key={type.label} onClick={() => setWaste(type)}>
                  <Icon size={26} /> {type.label}
                </button>
              );
            })}
          </div>
          <label className="weight-input">Peso de la recolección<input inputMode="decimal" min="0" onChange={(e) => setWeight(e.target.value)} type="number" value={weight} /><span>KG</span></label>
        </section>
        <section className="card">
          <StepTitle number="2" title="Cálculo de tarifa" />
          <div className="fee-box">
            <span>Tarifa base</span><strong>$42,000</strong>
            <span>Excedente</span><strong>${Math.max(total - 42000, 0).toLocaleString('es-CO')}</strong>
            <span>Total a cobrar</span><strong className="total">${total.toLocaleString('es-CO')}</strong>
          </div>
        </section>
        <section className="card">
          <StepTitle number="3" title="Método de pago" />
          <div className="payment-grid">
            {['Efectivo', 'PSE / Nequi', 'Crédito corporativo'].map((item) => <button className={payment === item ? 'selected' : ''} key={item} onClick={() => setPayment(item)}>{item}</button>)}
          </div>
        </section>
        <section className="card">
          <StepTitle number="4" title="Firmas digitales" />
          <div className="signature"><span>Firma del generador</span></div>
          <div className="signature empty"><span>Firma del transportador</span></div>
        </section>
        {saveStatus && <p className="save-status">{saveStatus}</p>}
        <button className="button primary complete" onClick={complete}><Check size={20} /> Completar manifiesto</button>
      </main>
      <nav className="bottom-nav">
        <button className="active"><Home size={20} /> Home</button>
        <button><Truck size={20} /> Rutas</button>
        <button><QrCode size={20} /> Scanner</button>
        <button onClick={() => nav.setPage('login')}><UserCircle size={20} /> Perfil</button>
      </nav>
    </div>
  );
}

function StepTitle({ number, title }) {
  return <div className="step-title"><span>{number}</span><h2>{title}</h2></div>;
}

function PageHeading({ title, subtitle, action }) {
  return (
    <div className="page-heading">
      <div><h1>{title}</h1><p>{subtitle}</p></div>
      <button className="button primary"><Plus size={18} /> {action}</button>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, trend }) {
  return (
    <article className="card kpi">
      <div><span>{label}</span><strong>{value}</strong></div>
      <div className="kpi-icon"><Icon size={23} /></div>
      <p><Activity size={15} /> {trend}</p>
    </article>
  );
}

function Progress({ value }) {
  return <div className="progress"><span style={{ width: `${value}%` }} /></div>;
}

function ManifestTable({ admin = false, manifests: manifestRows = manifests }) {
  return (
    <section className="card table-card">
      <div className="section-title"><FileText size={22} /><h2>{admin ? 'Manifiestos recientes' : 'Certificados y manifiestos'}</h2></div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>ID</th>{admin && <th>Cliente</th>}<th>Tipo</th><th>Cantidad</th><th>Estado</th><th>Fecha</th><th></th></tr></thead>
          <tbody>
            {manifestRows.map((manifest) => (
              <tr key={manifest.id}>
                <td>{manifest.id}</td>
                {admin && <td>{manifest.client}</td>}
                <td>{manifest.type}</td>
                <td>{manifest.weight}</td>
                <td><span className={`status ${manifest.status.toLowerCase().replace(' ', '-')}`}>{manifest.status}</span></td>
                <td>{manifest.date}</td>
                <td><IconButton label="Descargar"><Download size={17} /></IconButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
