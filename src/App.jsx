import React, { useState } from 'react';
import { toJpeg } from 'html-to-image';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, Calendar as CalendarIcon, 
  FileSpreadsheet, TrendingUp, LogOut, Check, Clock, Plus, 
  ChevronLeft, ChevronRight, X, Tag, Edit3, Trash2, AlertTriangle, 
  Palette, ChevronDown, ChevronUp, DollarSign, Activity, CheckSquare, Square,
  BarChart3, Layers, MapPin, ArrowUpRight, ArrowDownRight,
  Download, FileText, ShieldCheck, Users, UserCheck, UserX, Wifi
} from 'lucide-react';

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
  const podeEditar = usuario?.perfil === 'admin' || (usuario?.perfil === 'usuario' && usuario?.nivelPermissao === 'editar');
  const [telaAtiva, setTelaAtiva] = useState('hub');

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroLogin, setErroLogin] = useState('');
  const [modoLoginAdmin, setModoLoginAdmin] = useState(false);

  const [indiceMes, setIndiceMes] = useState(0);
  const [diaSelecionado, setDiaSelecionado] = useState(28);
  const [eventos, setEventos] = useState(() => {
    const salvo = localStorage.getItem('app_eventos_calendario_oficial');
    return salvo ? JSON.parse(salvo) : EVENTOS_INICIAIS;
  });

  const [modalNovoEvento, setModalNovoEvento] = useState(false);
  const [eventoPopUp, setEventoPopUp] = useState(null);
  const [filtroRpfoAtivo, setFiltroRpfoAtivo] = useState(null);

  const [listaRodoviasRefs, setListaRodoviasRefs] = useState(CORES_RPFO_INICIAIS);
  const [modalAdicionarRef, setModalAdicionarRef] = useState(false);
  const [itemRefEmEdicao, setItemRefEmEdicao] = useState(null);
  const [itemRefParaExcluir, setItemRefParaExcluir] = useState(null);

  const [tiposSelecionados, setTiposSelecionados] = useState(['RPFO']);
  const [novaRefNome, setNovaRefNome] = useState('');
  const [novaRefCor, setNovaRefCor] = useState(PALETA_CORES[0]);

  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoRpfo, setNovoRpfo] = useState('BR-080/DF');
  const [novoProcessoSei, setNovoProcessoSei] = useState('');
  const [novoDescricao, setNovoDescricao] = useState('');

  const [eventoEmEdicao, setEventoEmEdicao] = useState(null);
  const [eventoParaExcluir, setEventoParaExcluir] = useState(null);

  const [listaRevisoes, setListaRevisoes] = useState(() => {
    const salvo = localStorage.getItem('app_lista_revisoes_oficial');
    return salvo ? JSON.parse(salvo) : DADOS_REVISOES_INICIAIS;
  });

  const [cardsExpandidosIds, setCardsExpandidosIds] = useState([]);
  
  const [listaUsuariosAcesso, setListaUsuariosAcesso] = useState(() => {
    const salvo = localStorage.getItem('app_usuarios_controle_acesso');
    return salvo ? JSON.parse(salvo) : [
      { 
        id: 1, 
        nome: 'Marcus Passos', 
        usuario: 'admin.passos', 
        perfil: 'admin', 
        cargo: 'Coordenador BIM / Gestor', 
        status: 'online', 
        ultimoAcesso: 'Agora mesmo', 
        ip: '192.168.1.102',
        rpfosPermitidas: 'todas',
        nivelPermissao: 'editar'
      }
    ];
  });

  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);
  const [formUsuario, setFormUsuario] = useState({
    nome: '',
    usuario: '',
    senha: '',
    nivelPermissao: 'visualizar',
    modulosPermitidos: ['calendario', 'revisoes', 'refs'],
    rpfosPermitidas: []
  });

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

  React.useEffect(() => {
    localStorage.setItem('app_eventos_calendario_oficial', JSON.stringify(eventos));
  }, [eventos]);

  React.useEffect(() => {
    localStorage.setItem('app_lista_revisoes_oficial', JSON.stringify(listaRevisoes));
  }, [listaRevisoes]);

  React.useEffect(() => {
    localStorage.setItem('app_cores_rpfo_oficial', JSON.stringify(coresCustomizadas));
  }, [coresCustomizadas]);

  const listaObrasSincronizadas = listaRevisoes.map((rev, index) => {
    const idRpfo = rev.br.split(' - ')[0].trim();
    const corSalva = coresCustomizadas[idRpfo] || coresCustomizadas[rev.br];
    const corFinal = corSalva || PALETA_CORES[index % PALETA_CORES.length];

    return {
      id: idRpfo,
      brCompleta: rev.br,
      nome: rev.br,
      corBg: corFinal.corBg,
      border: corFinal.border,
      hex: corFinal.hex
    };
  });

  const mesAtualObj = MESES_DISPONIVEIS[indiceMes];
  const diasNoMes = new Date(mesAtualObj.ano, mesAtualObj.mes + 1, 0).getDate();
  const primeiroDiaSemana = new Date(mesAtualObj.ano, mesAtualObj.mes, 1).getDay();
  const diasArray = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  const espacosVaziosIniciais = Array.from({ length: primeiroDiaSemana }, (_, i) => i);

  const converterMoedaParaNumero = (str) => {
    if (!str) return 0;
    const limpo = str.toString().replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
    return parseFloat(limpo) || 0;
  };

  const formatarNumeroParaMoeda = (num) => {
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const recalcularCamposRPFO = (obj, campoAlterado, novoValor) => {
    const atualizado = { ...obj, [campoAlterado]: novoValor };
    const pi = converterMoedaParaNumero(campoAlterado === 'precoInicial' ? novoValor : atualizado.precoInicial);
    const acresc = converterMoedaParaNumero(campoAlterado === 'acrescimo' ? novoValor : (atualizado.acrescimo || '0'));
    const decresc = converterMoedaParaNumero(campoAlterado === 'decrescimo' ? novoValor : (atualizado.decrescimo || '0'));

    if (pi > 0) {
      const novoTotal = pi + acresc - decresc;
      const diferencaLiquida = acresc - decresc;
      const percLiquido = (diferencaLiquida / pi) * 100;
      const ehPositivo = diferencaLiquida >= 0;

      atualizado.precoFinal = formatarNumeroParaMoeda(novoTotal);
      atualizado.acumulado = (diferencaLiquida < 0 ? '- ' : '') + formatarNumeroParaMoeda(Math.abs(diferencaLiquida));
      atualizado.percentual = (diferencaLiquida > 0 ? '+' : '') + percLiquido.toFixed(2).replace('.', ',') + '%';
      atualizado.ehPositivo = ehPositivo;
    }

    return atualizado;
  };

  const salvarNovaRevisao = (e) => {
    e.preventDefault();
    if (!formNovaRpfo.br.trim()) return;

    const pi = converterMoedaParaNumero(formNovaRpfo.precoInicial);
    const pif = converterMoedaParaNumero(formNovaRpfo.precoFinal);
    const dif = pif - pi;
    const perc = pi > 0 ? (dif / pi) * 100 : 0;
    const ehPositivo = dif >= 0;

    const extrairUf = formNovaRpfo.br.includes('/') ? formNovaRpfo.br.split('/')[1].slice(0, 2).toUpperCase() : 'BR';

    const nova = {
      id: Date.now(),
      ...formNovaRpfo,
      uf: extrairUf,
      tipoObra: 'RPFO - Adequação Orçamentária',
      itensAdequados: ['Terraplenagem', 'Sinalização e Segurança'],
      acumulado: (dif < 0 ? '- ' : '') + formatarNumeroParaMoeda(Math.abs(dif)),
      percentual: (dif > 0 ? '+' : '') + perc.toFixed(2).replace('.', ',') + '%',
      ehPositivo,
      linkDrive: '',
      etapas: [
        { nome: 'RPFO Concluída', data: 'Concluído', status: 'concluido' },
        { nome: 'Protocolada', data: 'Em análise', status: 'andamento' },
        { nome: 'Parecer Supervisora', data: 'Não iniciado', status: 'nao_iniciado' },
        { nome: 'Parecer Fiscal', data: 'Não iniciado', status: 'nao_iniciado' },
        { nome: 'Parecer COENGE', data: 'Não iniciado', status: 'nao_iniciado' },
        { nome: 'Parecer SR.', data: 'Não iniciado', status: 'nao_iniciado' },
        { nome: 'CGCONT', data: 'Não iniciado', status: 'nao_iniciado' },
      ]
    };

    setListaRevisoes([...listaRevisoes, nova]);
    setFormNovaRpfo({
      br: '', modalidade: 'Rodovia', statusGeral: 'A Iniciar', precoInicial: '', precoFinal: '', acumulado: '', percentual: '', contrato: '', processoSei: '', contratada: 'CLC', observacao: ''
    });
    setModalNovaRevisao(false);
  };

  const lidarComLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErroLogin('Por favor, informe seu usuário e senha.');
      return;
    }

    const usuarioFormatado = email.trim().toLowerCase();

    if (modoLoginAdmin) {
      if (senha !== 'admin123' && senha !== '123456') {
        setErroLogin('Chave de segurança administrativa inválida.');
        return;
      }

      setUsuario({
        email: usuarioFormatado,
        nome: 'Administrador',
        perfil: 'admin',
        nivelPermissao: 'editar',
        modulosPermitidos: ['calendario', 'revisoes', 'refs'],
        rpfosPermitidas: 'todas'
      });
    } else {
      const usuarioCadastrado = listaUsuariosAcesso.find(u => u.usuario.toLowerCase() === usuarioFormatado);

      if (!usuarioCadastrado) {
        setErroLogin('Usuário não encontrado no sistema.');
        return;
      }

      if (usuarioCadastrado.senha && usuarioCadastrado.senha !== senha) {
        setErroLogin('Senha incorreta.');
        return;
      }

      setUsuario({
        email: usuarioFormatado,
        nome: usuarioCadastrado.nome,
        perfil: 'usuario',
        nivelPermissao: usuarioCadastrado.nivelPermissao || 'visualizar',
        modulosPermitidos: usuarioCadastrado.modulosPermitidos || ['calendario', 'revisoes', 'refs'],
        rpfosPermitidas: usuarioCadastrado.rpfosPermitidas || 'todas'
      });
    }

    setErroLogin('');
    setTelaAtiva('hub');
  };

  const fazerLogout = () => {
    setUsuario(null);
    setEmail('');
    setSenha('');
    setFiltroRpfoAtivo(null);
    setRpfosSelecionadasDashIds([]);
    setCardsExpandidosIds([]);
    setIdRpfoEmEspecificacao(null);
    setTelaAtiva('hub');
  };

  // 1. TELA DE LOGIN
  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#111922] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#1c2936] rounded-3xl p-8 border border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-4">Faça seu login</h1>
          {erroLogin && <div className="mb-4 p-2 bg-red-900/40 text-red-200 text-xs rounded">{erroLogin}</div>}
          <form onSubmit={lidarComLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Usuário"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white"
            />
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white"
            />
            <button type="submit" className="w-full py-3 bg-[#5390f5] text-white rounded-xl font-bold text-sm cursor-pointer">
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. TELA HUB
  if (telaAtiva === 'hub') {
    return (
      <div className="min-h-screen bg-[#111922] text-white p-12 flex flex-col justify-between font-sans">
        <header className="flex justify-between items-center max-w-6xl mx-auto w-full pb-6 border-b border-gray-800">
          <span className="text-sm font-semibold">{usuario.nome}</span>
          <button onClick={fazerLogout} className="text-xs text-red-400 flex items-center gap-1 cursor-pointer">
            <LogOut size={16} /> Sair
          </button>
        </header>

        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Selecione o módulo de trabalho</h2>
          <div className="grid grid-cols-2 gap-6">
            <div onClick={() => setTelaAtiva('revisoes')} className="bg-[#1c2936] p-8 rounded-3xl border border-gray-800 cursor-pointer hover:border-[#84cc16]">
              <h3 className="text-2xl font-bold text-[#84cc16] mb-2">Revisões de RPFO</h3>
              <p className="text-xs text-gray-400">Gerenciar portfólio de obras</p>
            </div>
            <div onClick={() => setTelaAtiva('calendario')} className="bg-[#1c2936] p-8 rounded-3xl border border-gray-800 cursor-pointer hover:border-[#5390f5]">
              <h3 className="text-2xl font-bold text-[#5390f5] mb-2">Calendário</h3>
              <p className="text-xs text-gray-400">Acompanhar cronograma</p>
            </div>
          </div>
        </div>
        <div />
      </div>
    );
  }

  // 5. DASHBOARD PRINCIPAL DE REVISÕES
  if (telaAtiva === 'revisoes') {
    return (
      <div className="min-h-screen bg-[#0d141c] text-white p-8 font-sans">
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-8 border-b border-gray-800">
          <button onClick={() => setTelaAtiva('hub')} className="text-xs bg-[#16212e] px-4 py-2 rounded-xl border border-gray-700 cursor-pointer">
            ← Voltar ao Início
          </button>

          <button
            type="button"
            onClick={() => setModalNovaRevisao(true)}
            className="bg-[#84cc16] text-black py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Plus size={16} />
            <span>Nova Revisão (RPFO)</span>
          </button>
        </header>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Painel Executivo de RPFOs</h2>
          <p className="text-xs text-gray-400">Lista de revisões ativas no sistema.</p>
        </div>

        {/* MODAL CADASTRAR NOVA RPFO */}
        {modalNovaRevisao && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[9999]">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 relative">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Cadastrar Nova RPFO</h3>
                <button onClick={() => setModalNovaRevisao(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarNovaRevisao} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Identificação da Obra / Trecho</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: BR-230/PA"
                    value={formNovaRpfo.br}
                    onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, br: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">Preço Inicial (PI)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 350.000.000,00"
                      value={formNovaRpfo.precoInicial}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, precoInicial: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">PI + RPFO Final</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 375.000.000,00"
                      value={formNovaRpfo.precoFinal}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, precoFinal: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setModalNovaRevisao(false)} className="flex-1 py-2.5 bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold cursor-pointer">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#84cc16] text-black rounded-xl text-xs font-bold cursor-pointer">
                    Salvar RPFO
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // TELA CALENDÁRIO
  if (telaAtiva === 'calendario') {
    return (
      <div className="min-h-screen bg-[#111922] text-white p-8 font-sans">
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-8 border-b border-gray-800">
          <button onClick={() => setTelaAtiva('hub')} className="text-xs bg-[#1c2936] px-4 py-2 rounded-xl border border-gray-700 cursor-pointer">
            ← Voltar ao Início
          </button>
          <button
            type="button"
            onClick={() => setModalNovaRevisao(true)}
            className="bg-[#84cc16] text-black py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Plus size={16} />
            <span>Nova RPFO</span>
          </button>
        </header>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Calendário Operacional</h2>
        </div>
      </div>
    );
  }

  return null;
}