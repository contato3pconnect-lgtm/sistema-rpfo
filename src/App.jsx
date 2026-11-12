import React, { useState, useEffect } from 'react';
import { toJpeg } from 'html-to-image';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Calendar as CalendarIcon, 
  FileSpreadsheet, TrendingUp, LogOut, Check, Clock, Plus, 
  ChevronLeft, ChevronRight, X, Tag, Edit3, Trash2, AlertTriangle, 
  Palette, ChevronDown, ChevronUp, DollarSign, Activity, CheckSquare, Square,
  BarChart3, Layers, MapPin, ArrowUpRight, ArrowDownRight,
  Download, FileText, ShieldCheck, Users, UserCheck, UserX, Wifi
} from 'lucide-react';

// Importações e Configuração do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs, onSnapshot } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCC-d1_xtJkfmD6zcvjlGLhZNFNFU4cjtk0",
  authDomain: "rpfo-oliveira.firebaseapp.com",
  projectId: "rpfo-oliveira",
  storageBucket: "rpfo-oliveira.firebasestorage.app",
  messagingSenderId: "339112009577",
  appId: "1:339112009577:web:c5140fdda581eb1e6fa7f8",
  measurementId: "G-VM2WZEYLTR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const PALETA_CORES = [
  { id: 'purple', nome: 'Roxo', corBg: 'bg-purple-600', border: 'border-purple-500', hex: '#9333ea' },
  { id: 'emerald', nome: 'Verde Esmeralda', corBg: 'bg-emerald-600', border: 'border-emerald-500', hex: '#059669' },
  { id: 'cyan', nome: 'Azul Ciano', corBg: 'bg-cyan-600', border: 'border-cyan-500', hex: '#0891b2' },
  { id: 'rose', nome: 'Rosa / Carmim', corBg: 'bg-rose-600', border: 'border-rose-500', hex: '#e11d48' },
  { id: 'amber', nome: 'Âmbar / Laranja', corBg: 'bg-amber-600', border: 'border-amber-500', hex: '#d97706' },
  { id: 'blue', nome: 'Azul Cobalto', corBg: 'bg-blue-600', border: 'border-blue-500', hex: '#2563eb' },
  { id: 'indigo', nome: 'Índigo', corBg: 'bg-indigo-600', border: 'border-indigo-500', hex: '#4f46e5' },
  { id: 'teal', nome: 'Verde Petróleo', corBg: 'bg-teal-600', border: 'border-teal-500', hex: '#0d9488' },
  { id: 'red', nome: 'Vermelho', corBg: 'bg-red-600', border: 'border-red-500', hex: '#dc2626' },
  { id: 'lime', nome: 'Verde Lima', corBg: 'bg-lime-600', border: 'border-lime-500', hex: '#65a30d' },
  { id: 'violet', nome: 'Violeta', corBg: 'bg-violet-600', border: 'border-violet-500', hex: '#7c3aed' },
  { id: 'fuchsia', nome: 'Fúcsia', corBg: 'bg-fuchsia-600', border: 'border-fuchsia-500', hex: '#c026d3' },
  { id: 'pink', nome: 'Rosa Choque', corBg: 'bg-pink-600', border: 'border-pink-500', hex: '#db2777' },
  { id: 'orange', nome: 'Laranja Vivo', corBg: 'bg-orange-500', border: 'border-orange-400', hex: '#f97316' },
  { id: 'yellow', nome: 'Amarelo Ouro', corBg: 'bg-yellow-500', border: 'border-yellow-400', hex: '#eab308' },
  { id: 'green', nome: 'Verde Floresta', corBg: 'bg-green-600', border: 'border-green-500', hex: '#16a34a' },
  { id: 'sky', nome: 'Azul Céu', corBg: 'bg-sky-500', border: 'border-sky-400', hex: '#0ea5e9' },
  { id: 'slate', nome: 'Cinza Ardósia', corBg: 'bg-slate-500', border: 'border-slate-400', hex: '#64748b' },
  { id: 'zinc', nome: 'Cinza Prata', corBg: 'bg-zinc-400', border: 'border-zinc-300', hex: '#a1a1aa' },
  { id: 'stone', nome: 'Areia / Terra', corBg: 'bg-stone-500', border: 'border-stone-400', hex: '#78716c' },
  { id: 'wine', nome: 'Vinho', corBg: 'bg-rose-900', border: 'border-rose-700', hex: '#881337' },
  { id: 'darkcyan', nome: 'Ciano Escuro', corBg: 'bg-cyan-800', border: 'border-cyan-600', hex: '#155e75' },
];

const CORES_RPFO_INICIAIS = [
  { id: 'BR-324/BA', tipos: ['RPFO'], nome: 'BR-324/BA', corBg: 'bg-emerald-600', border: 'border-emerald-500', hex: '#059669' },
  { id: 'BR-158/PA', tipos: ['RPFO'], nome: 'BR-158/PA', corBg: 'bg-rose-600', border: 'border-rose-500', hex: '#e11d48' },
  { id: 'BR-080', tipos: ['RPFO'], nome: 'BR-080/DF', corBg: 'bg-lime-600', border: 'border-lime-500', hex: '#65a30d' },
  { id: 'BR-304', tipos: ['RPFO'], nome: 'BR-304-RN', corBg: 'bg-cyan-600', border: 'border-cyan-500', hex: '#0891b2' },
  { id: 'HIDRO — 720', tipos: ['RPFO'], nome: 'Hidro - 720/ITA', corBg: 'bg-blue-600', border: 'border-blue-500', hex: '#2563eb' },
  { id: 'BR-285', tipos: ['RPFO'], nome: 'BR-285/Ijuí', corBg: 'bg-purple-600', border: 'border-purple-500', hex: '#9333ea' },
];

const MESES_DISPONIVEIS = [
  { nome: 'Outubro 2026', mes: 9, ano: 2026 },
  { nome: 'Novembro 2026', mes: 10, ano: 2026 },
  { nome: 'Dezembro 2026', mes: 11, ano: 2026 },
  { nome: 'Janeiro 2027', mes: 0, ano: 2027 },
  { nome: 'Fevereiro 2027', mes: 1, ano: 2027 },
];

const EVENTOS_INICIAIS = [
  {
    id: 101,
    dia: 6,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-080/DF',
    titulo: 'Parecer da supervisora aprovando',
    tipo: 'Acontecimento',
    processoSei: '26222153',
    descricao: 'Constitui o Parecer Técnico Circunstanciado da Supervisora referente à 1ª RPFO.'
  }
];

const DADOS_REVISOES_INICIAIS = [
  {
    id: 1,
    br: 'BR-104/AL-2A',
    modalidade: 'Rodovia',
    statusGeral: 'Em Análise',
    uf: 'AL',
    tipoObra: 'RPFO - Restauração e Adequação',
    precoInicial: '481.714.777,66',
    precoFinal: '470.861.602,10',
    acumulado: '- 10.853.175,56',
    percentual: '-2,25%',
    ehPositivo: false,
    contrato: '796/2025',
    processoSei: '50620.001283/2026-25',
    contratada: 'CLC',
    observacao: 'Atendendo a solicitação da CGU',
    linkDrive: '',
    itensAdequados: ['Terraplenagem', 'Adequação da Pista de Rolamento', 'Sinalização e Segurança'],
    etapas: [
      { nome: 'RPFO Concluída', data: '05/08/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '31/08/2026', status: 'concluido' },
      { nome: 'Parecer Supervisora', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer Fiscal', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer COENGE', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer SR.', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'CGCONT', data: 'Não iniciado', status: 'nao_iniciado' },
    ]
  }
];

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const podeEditar = usuario?.perfil === 'admin' || usuario?.nivelPermissao === 'editar';
  const [telaAtiva, setTelaAtiva] = useState('hub');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroLogin, setErroLogin] = useState('');
  const [modoLoginAdmin, setModoLoginAdmin] = useState(false);

  const [indiceMes, setIndiceMes] = useState(0);
  const [diaSelecionado, setDiaSelecionado] = useState(28);
  const [eventos, setEventos] = useState(EVENTOS_INICIAIS);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "eventos_calendario"), (snapshot) => {
      const dadosNuvem = snapshot.docs.map(doc => ({ idDoc: doc.id, ...doc.data() }));
      if (dadosNuvem.length > 0) {
        setEventos(dadosNuvem);
      } else {
        EVENTOS_INICIAIS.forEach(async (ev) => {
          await setDoc(doc(db, "eventos_calendario", String(ev.id)), ev);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const [modalNovoEvento, setModalNovoEvento] = useState(false);
  const [eventoPopUp, setEventoPopUp] = useState(null);
  const [filtroRpfoAtivo, setFiltroRpfoAtivo] = useState(null);

  const [listaRodoviasRefs, setListaRodoviasRefs] = useState(CORES_RPFO_INICIAIS);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoRpfo, setNovoRpfo] = useState('BR-080/DF');
  const [novoProcessoSei, setNovoProcessoSei] = useState('');
  const [novoDescricao, setNovoDescricao] = useState('');

  const [eventoEmEdicao, setEventoEmEdicao] = useState(null);
  const [eventoParaExcluir, setEventoParaExcluir] = useState(null);

  const [listaRevisoes, setListaRevisoes] = useState(DADOS_REVISOES_INICIAIS);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "revisoes_rpfo"), (snapshot) => {
      const dadosNuvem = snapshot.docs.map(doc => ({ idDoc: doc.id, ...doc.data() }));
      if (dadosNuvem.length > 0) {
        setListaRevisoes(dadosNuvem);
      } else {
        DADOS_REVISOES_INICIAIS.forEach(async (rev) => {
          await setDoc(doc(db, "revisoes_rpfo", String(rev.id)), rev);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const [cardsExpandidosIds, setCardsExpandidosIds] = useState([]);
  const [rpfosSelecionadasDashIds, setRpfosSelecionadasDashIds] = useState([]);
  const [filtroModalidadeDash, setFiltroModalidadeDash] = useState('Todos');
  const [filtroEmpresaDash, setFiltroEmpresaDash] = useState('Todas');
  const [revisaoEmEdicao, setRevisaoEmEdicao] = useState(null);
  const [revisaoParaExcluir, setRevisaoParaExcluir] = useState(null);
  const [modalNovaRevisao, setModalNovaRevisao] = useState(false);

  const [idRpfoEmEspecificacao, setIdRpfoEmEspecificacao] = useState(null);
  const [novoItemAdequadoTexto, setNovoItemAdequadoTexto] = useState('');
  const [exportando, setExportando] = useState(false);
  const [menuExportarAberto, setMenuExportarAberto] = useState(false);

  const [formNovaRpfo, setFormNovaRpfo] = useState({
    br: '', modalidade: 'Rodovia', statusGeral: 'A Iniciar', precoInicial: '', precoFinal: '', acumulado: '', percentual: '', contrato: '', processoSei: '', contratada: 'CLC', observacao: ''
  });

  const [coresCustomizadas, setCoresCustomizadas] = useState(() => {
    const salvo = localStorage.getItem('app_cores_rpfo_oficial');
    return salvo ? JSON.parse(salvo) : {};
  });
  const [rpfoSelecionandoCor, setRpfoSelecionandoCor] = useState(null);

  const [listaUsuariosAcesso, setListaUsuariosAcesso] = useState([
    { id: 1, nome: 'Marcus Passos', usuario: 'admin.passos', perfil: 'admin', status: 'online', ultimoAcesso: 'Agora mesmo', nivelPermissao: 'editar', modulosPermitidos: ['calendario', 'revisoes', 'refs'], rpfosPermitidas: 'todas' }
  ]);
  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);
  const [formUsuario, setFormUsuario] = useState({ nome: '', usuario: '', senha: '', nivelPermissao: 'visualizar', modulosPermitidos: ['calendario', 'revisoes', 'refs'], rpfosPermitidas: [] });

  const converterMoedaParaNumero = (str) => {
    if (!str) return 0;
    const limpo = str.toString().replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
    return parseFloat(limpo) || 0;
  };

  const formatarNumeroParaMoeda = (num) => {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const salvarAcontecimento = async (e) => {
    e.preventDefault();
    if (!novoTitulo.trim()) return;

    const novoItem = {
      id: Date.now(),
      dia: diaSelecionado,
      mes: mesAtualObj.mes,
      ano: mesAtualObj.ano,
      rpfoId: novoRpfo,
      titulo: novoTitulo.trim(),
      tipo: 'Acontecimento',
      processoSei: novoProcessoSei.trim() || 'Não informado',
      descricao: novoDescricao.trim() || 'Acontecimento registrado pela equipe.'
    };

    const novosEventos = [...eventos, novoItem];
    setEventos(novosEventos);
    localStorage.setItem('app_eventos_calendario_oficial', JSON.stringify(novosEventos));

    try {
      await setDoc(doc(db, "eventos_calendario", String(novoItem.id)), novoItem);
    } catch (err) {
      console.error("Erro ao salvar acontecimento no Firebase:", err);
    }

    setNovoTitulo('');
    setNovoProcessoSei('');
    setNovoDescricao('');
    setModalNovoEvento(false);
  };

  const confirmarExclusaoAcontecimento = async () => {
    if (!eventoParaExcluir) return;
    const idParaExcluir = eventoParaExcluir.id;

    const novosEventos = eventos.filter(ev => ev.id !== idParaExcluir);
    setEventos(novosEventos);
    localStorage.setItem('app_eventos_calendario_oficial', JSON.stringify(novosEventos));

    try {
      await deleteDoc(doc(db, "eventos_calendario", String(idParaExcluir)));
    } catch (err) {
      console.error("Erro ao excluir acontecimento do Firebase:", err);
    }
    setEventoParaExcluir(null);
  };

  const salvarNovaRevisao = async (e) => {
    e.preventDefault();
    if (!formNovaRpfo.br.trim()) return;

    const pi = converterMoedaParaNumero(formNovaRpfo.precoInicial);
    const pif = converterMoedaParaNumero(formNovaRpfo.precoFinal);
    const dif = pif - pi;
    const perc = pi > 0 ? (dif / pi) * 100 : 0;
    const ehPositivo = dif >= 0;

    const nova = {
      id: Date.now(),
      ...formNovaRpfo,
      uf: 'BR',
      acumulado: (dif < 0 ? '- ' : '') + formatarNumeroParaMoeda(Math.abs(dif)),
      percentual: (dif > 0 ? '+' : '') + perc.toFixed(2).replace('.', ',') + '%',
      ehPositivo,
      linkDrive: '',
      etapas: [
        { nome: 'RPFO Concluída', data: 'Concluído', status: 'concluido' },
        { nome: 'Protocolada', data: 'Em análise', status: 'andamento' }
      ]
    };

    const novaLista = [...listaRevisoes, nova];
    setListaRevisoes(novaLista);

    try {
      await setDoc(doc(db, "revisoes_rpfo", String(nova.id)), nova);
    } catch (err) {
      console.error("Erro ao salvar nova RPFO:", err);
    }

    setFormNovaRpfo({ br: '', modalidade: 'Rodovia', statusGeral: 'A Iniciar', precoInicial: '', precoFinal: '', acumulado: '', percentual: '', contrato: '', processoSei: '', contratada: 'CLC', observacao: '' });
    setModalNovaRevisao(false);
  };

  const confirmarExclusaoRevisao = async () => {
    if (!revisaoParaExcluir) return;
    const idParaExcluir = revisaoParaExcluir.id;

    setListaRevisoes(prev => prev.filter(r => r.id !== idParaExcluir));
    try {
      await deleteDoc(doc(db, "revisoes_rpfo", String(idParaExcluir)));
    } catch (err) {
      console.error("Erro ao excluir do Firebase:", err);
    }
    setRevisaoParaExcluir(null);
  };

  const lidarComLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErroLogin('Por favor, informe seu usuário e senha.');
      return;
    }
    setUsuario({ email, nome: 'Administrador', perfil: 'admin', nivelPermissao: 'editar' });
    setTelaAtiva('hub');
  };

  const fazerLogout = () => {
    setUsuario(null);
    setTelaAtiva('hub');
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#111922] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1c2936] p-8 rounded-3xl border border-gray-800 text-white shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Faça seu login</h2>
          {erroLogin && <p className="text-red-400 text-xs mb-3">{erroLogin}</p>}
          <form onSubmit={lidarComLogin} className="space-y-4">
            <input type="text" placeholder="Usuário" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 bg-[#15202b] rounded-xl border border-gray-700 text-sm" />
            <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} className="w-full px-3 py-2 bg-[#15202b] rounded-xl border border-gray-700 text-sm" />
            <button type="submit" className="w-full py-2 bg-[#5390f5] rounded-xl font-bold text-sm">Entrar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111922] text-white p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Sistema RPFO Oliveira Engenharia</h1>
      <p className="text-gray-400 mb-6">Conectado e sincronizado com o Firebase com sucesso!</p>
      <button onClick={fazerLogout} className="px-4 py-2 bg-red-600 rounded-xl font-bold">Sair do Sistema</button>
    </div>
  );
}