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
    descricao: 'Constitui o Parecer Técnico Circunstanciado da Supervisora referente à 1ª RPFO. O documento valida tecnicamente os ajustes e correções de projeto (terraplenagem, drenagem, pavimentação, canteiro e remanejamentos), confirma o reflexo financeiro positivo líquido de R$ 51.519.876,14 (+16,40% sobre o valor inicial), atesta a manutenção do equilíbrio econômico-financeiro (desconto original de 1,50%) e conclui que a revisão se encontra "em condições de aceitação" para encaminhamento à fiscalização do DNIT.'
  },
  {
    id: 102,
    dia: 20,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-324/BA - Feira de Santana',
    titulo: 'Fiscalização aprovando RPFO',
    tipo: 'Acontecimento',
    processoSei: '26321453',
    descricao: 'A Fiscalização manifestou-se favorável à aprovação da referida revisão (Versão 05) com base na análise positiva da Supervisora de Obras e em conformidade com a Instrução Normativa n.º 10/DNIT SEDE/2025.'
  },
  {
    id: 103,
    dia: 21,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-304/RN - 1B',
    titulo: 'RPFO encaminhada',
    tipo: 'Acontecimento',
    processoSei: '26334921',
    descricao: 'Foi encaminhado por despacho (26334921) ao Serviço de Construção Terrestre a Carta formal com o link da RPFO e anexos.'
  },
  {
    id: 104,
    dia: 22,
    mes: 9,
    ano: 2026,
    rpfoId: 'HIDRO — 720/ITA',
    titulo: 'Despacho DNIT SEDE/DAQ para CGOB',
    tipo: 'Acontecimento',
    processoSei: '26346144',
    descricao: 'Houve um despacho (26346144) do DNIT SEDE/DAQ para CGOB (22.10.2026) onde teve a aprovação jurídica parcial com veto a itens novos de escopo. Itens Vetados: Inclusão dos Produtos 07A, 07B e 07C (serviços vinculados à sinalização náutica). Além disso foi pedido uma revisão da planilha orçamentária e da memória de cálculo, com a consequente reapuração do valor e do percentual do acréscimo contratual.'
  },
  {
    id: 105,
    dia: 23,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-304/RN - 1B',
    titulo: 'Aprovação da Superintendência Regional',
    tipo: 'Acontecimento',
    processoSei: '26360536',
    descricao: 'Houve um despacho do Serviço de Construção Terrestre da Superintendência Regional do DNIT no Rio Grande do Norte manifestando concordância formal com a 1ª RPFO.'
  },
  {
    id: 106,
    dia: 23,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-324/BA - Feira de Santana',
    titulo: 'Carta encaminhada da SRBA para DIR',
    tipo: 'Acontecimento',
    processoSei: '26359006',
    descricao: 'Carta encaminhada à DIR para prosseguimento da tramitação e adoção das providências subsequentes.'
  },
  {
    id: 107,
    dia: 23,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-285/RS - Ijuí',
    titulo: 'Recusa da paralisação',
    tipo: 'Acontecimento',
    processoSei: '26351695',
    descricao: 'O DNIT enviou minuta ressaltando que não autorizou a paralisação pelo período solicitado, determinando a imediata retomada dos serviços.'
  },
  {
    id: 108,
    dia: 26,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-285/RS - Ijuí',
    titulo: 'Ratificação de Parecer da Fiscalização',
    tipo: 'Acontecimento',
    processoSei: '26359092',
    descricao: 'A Superintendência Regional ratifica o parecer da fiscalização e determina a retomada imediata das obras em até 5 dias úteis.'
  },
  {
    id: 109,
    dia: 27,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-080/DF',
    titulo: 'Carta de justificativa',
    tipo: 'Acontecimento',
    processoSei: '26392719',
    descricao: 'Prestação de esclarecimentos técnicos complementares e reencaminhamento de nova versão da 1ª RPFO da rodovia BR-080/DF.'
  },
  {
    id: 110,
    dia: 28,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-324/BA - Feira de Santana',
    titulo: 'Enviado à CGCONT',
    tipo: 'Acontecimento',
    processoSei: '26388715',
    descricao: 'Encaminhamento formal da RPFO para a CGCONT.'
  },
  {
    id: 111,
    dia: 28,
    mes: 9,
    ano: 2026,
    rpfoId: 'BR-304/RN - 1B',
    titulo: 'Parecer técnico resumido enviado',
    tipo: 'Acontecimento',
    processoSei: '26409924',
    descricao: 'Emitido Parecer Técnico Resumido manifestando-se favoravelmente à 1ª RPFO.'
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
  },
  {
    id: 2,
    br: 'BR-104/AL-1B',
    modalidade: 'Rodovia',
    statusGeral: 'Em Análise',
    uf: 'AL',
    tipoObra: 'RPFO - Restauração de Pavimento',
    precoInicial: '274.587.214,57',
    precoFinal: '267.870.029,73',
    acumulado: '- 6.717.184,84',
    percentual: '-2,45%',
    ehPositivo: false,
    contrato: '20 00245/2026',
    processoSei: '50620.000698/2026-81',
    contratada: 'CLC',
    observacao: 'Atendendo a solicitação da CGU',
    linkDrive: '',
    itensAdequados: ['Recapeamento CBUQ', 'Correção de Drenagem', 'Obras de Arte Correntes'],
    etapas: [
      { nome: 'RPFO Concluída', data: '31/08/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '31/08/2026', status: 'concluido' },
      { nome: 'Parecer Supervisora', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer Fiscal', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer COENGE', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer SR.', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'CGCONT', data: 'Não iniciado', status: 'nao_iniciado' },
    ]
  },
  {
    id: 3,
    br: 'BR-324/BA - Feira de Santana',
    modalidade: 'Rodovia',
    statusGeral: 'Em Análise',
    uf: 'BA',
    tipoObra: 'RPFO - Duplicação e Travessia Urbana',
    precoInicial: '179.422.844,66',
    precoFinal: '190.553.106,42',
    acumulado: '11.130.261,76',
    percentual: '6,20%',
    ehPositivo: true,
    contrato: '05 00287/2025',
    processoSei: '50605.001211/2026-76',
    contratada: 'COESA',
    observacao: '',
    linkDrive: '',
    itensAdequados: ['Alargamento de Pista', 'Viadutos e OAEs', 'Pavimentação Rígida'],
    etapas: [
      { nome: 'RPFO Concluída', data: '05/08/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '15/10/2026', status: 'concluido' },
      { nome: 'Parecer Supervisora', data: '16/10/2026', status: 'concluido' },
      { nome: 'Parecer Fiscal', data: '19/10/2026', status: 'concluido' },
      { nome: 'Parecer COENG', data: '23/10/2026', status: 'concluido' },
      { nome: 'Parecer SR.', data: '23/10/2026', status: 'concluido' },
      { nome: 'CGCONT', data: 'Em andamento', status: 'andamento' },
    ]
  },
  {
    id: 4,
    br: 'BR-158/PA',
    modalidade: 'Rodovia',
    statusGeral: 'Em Análise',
    uf: 'PA',
    tipoObra: 'RPFO - Restauração',
    precoInicial: '364.799.907,31',
    precoFinal: '374.230.273,39',
    acumulado: '9.430.366,08',
    percentual: '2,59%',
    ehPositivo: true,
    contrato: 'TT-036/2025',
    processoSei: '50600.001607/2024-00',
    contratada: 'CLC',
    observacao: '',
    linkDrive: '',
    itensAdequados: ['Terraplenagem', 'Sinalização de Obras', 'Obras Complementares'],
    etapas: [
      { nome: 'RPFO Concluída', data: '03/09/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '16/09/2026', status: 'concluido' },
      { nome: 'Parecer Supervisora', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer Fiscal', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer COENGE', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer SR.', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'CGCONT', data: 'Não iniciado', status: 'nao_iniciado' },
    ]
  },
  {
    id: 5,
    br: 'BR-080/DF',
    modalidade: 'Rodovia',
    statusGeral: 'Em Análise',
    uf: 'DF',
    tipoObra: 'RPFO - Adequação de Capacidade Rodoviária',
    precoInicial: '314.078.480,66',
    precoFinal: '365.598.356,80',
    acumulado: '51.519.876,14',
    percentual: '16,40%',
    ehPositivo: true,
    contrato: 'TT-036/2025',
    processoSei: '50600.001607/2024-00',
    contratada: 'CLC',
    observacao: '',
    linkDrive: '',
    itensAdequados: ['Terraplenagem', 'Sub-base e Base de Brita', 'Drenagem Profunda', 'Obras Complementares'],
    etapas: [
      { nome: 'RPFO Concluída', data: '18/09/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '29/09/2026', status: 'concluido' },
      { nome: 'Parecer Supervisora', data: '14/10/2026', status: 'concluido' },
      { nome: 'Parecer Fiscal', data: '28/10/2026', status: 'concluido' },
      { nome: 'Parecer COENGE', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer SR.', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'CGCONT', data: 'Não iniciado', status: 'nao_iniciado' },
    ]
  },
  {
    id: 6,
    br: 'BR-285/RS - Ijuí',
    modalidade: 'Rodovia',
    statusGeral: 'Em Análise',
    uf: 'RS',
    tipoObra: 'RPFO - Implantação e Pavimentação',
    precoInicial: '254.862.927,56',
    precoFinal: '272.332.921,57',
    acumulado: '17.469.994,01',
    percentual: '6,85%',
    ehPositivo: true,
    contrato: '10 00717/2023',
    processoSei: '50610.001741/2023-01',
    contratada: 'CLC',
    observacao: '',
    linkDrive: '',
    itensAdequados: ['Terraplenagem em Rocha', 'Obras de Arte Especiais', 'Sinalização Horizontal'],
    etapas: [
      { nome: 'RPFO Concluída', data: '19/08/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '20/08/2026', status: 'concluido' },
      { nome: 'Parecer Supervisora', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer Fiscal', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer COENGE', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'Parecer SR.', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'CGCONT', data: 'Não iniciado', status: 'nao_iniciado' },
    ]
  },
  {
    id: 7,
    br: 'BR-304/RN - 1B',
    modalidade: 'Rodovia',
    statusGeral: 'Em Análise',
    uf: 'RN',
    tipoObra: 'RPFO - Restauração e Reconstrução Emergencial',
    precoInicial: '367.039.090,72',
    precoFinal: '438.798.255,14',
    acumulado: '71.759.164,42',
    percentual: '19,55%',
    ehPositivo: true,
    contrato: 'TT-800/2025',
    processoSei: '50614.001979/2026-31',
    contratada: 'CLC',
    observacao: '',
    linkDrive: '',
    itensAdequados: ['Aterros e Enrocamentos', 'Passagens de Nível', 'Pavimentação Asfáltica', 'Drenagem Superficial'],
    etapas: [
      { nome: 'RPFO Concluída', data: '16/09/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '17/09/2026', status: 'concluido' },
      { nome: 'Parecer Supervisora', data: 'S/ supervisora', status: 'nd' },
      { nome: 'Parecer Fiscal', data: '23/10/2026', status: 'concluido' },
      { nome: 'Parecer COENGE', data: '28/10/2026', status: 'concluido' },
      { nome: 'Parecer SR.', data: 'Não iniciado', status: 'nao_iniciado' },
      { nome: 'CGCONT', data: 'Não iniciado', status: 'nao_iniciado' },
    ]
  },
  {
    id: 8,
    br: 'HIDRO — 720/ITA',
    modalidade: 'Hidrovia',
    statusGeral: 'Em Análise',
    uf: 'PA',
    tipoObra: 'RPFO - Proteção de Pilares e Dolfins em Hidrovia',
    precoInicial: '142.300.000,00',
    precoFinal: '154.850.000,00',
    acumulado: '12.550.000,00',
    percentual: '8,82%',
    ehPositivo: true,
    contrato: '15 00412/2024',
    processoSei: '50600.003180/2026-90',
    contratada: 'COESA',
    observacao: 'Ajuste de seção de dolfins de proteção',
    linkDrive: '',
    itensAdequados: ['Dolfins de Proteção', 'Enrocamento Submerso', 'Balizamento Náutico'],
    etapas: [
      { nome: 'RPFO Concluída', data: '18/08/2026', status: 'concluido' },
      { nome: 'Protocolada', data: '02/09/2026', status: 'concluido' },
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
    const partesNome = usuarioFormatado.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

    if (modoLoginAdmin) {
      if (senha !== 'admin123' && senha !== '123456') {
        setErroLogin('Chave de segurança administrativa inválida.');
        return;
      }

      setUsuario({
        email: usuarioFormatado,
        nome: partesNome || 'Administrador',
        perfil: 'admin',
        nivelPermissao: 'editar',
        modulosPermitidos: ['calendario', 'revisoes', 'refs'],
        rpfosPermitidas: 'todas'
      });
    } else {
      setUsuario({
        email: usuarioFormatado,
        nome: partesNome || usuarioFormatado,
        perfil: 'usuario',
        nivelPermissao: 'editar',
        modulosPermitidos: ['calendario', 'revisoes', 'refs'],
        rpfosPermitidas: 'todas'
      });
    }

    setErroLogin('');
    setTelaAtiva('hub');
  };

  const fazerLogout = () => {
    setUsuario(null);
    setEmail('');
    setSenha('');
    setTelaAtiva('hub');
  };

  // 1. TELA DE LOGIN
  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#111922] flex items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md bg-[#1c2936] rounded-3xl p-8 border border-gray-800 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Faça seu login</h1>
            <button
              onClick={() => setModoLoginAdmin(!modoLoginAdmin)}
              className={`text-[11px] px-2.5 py-1 rounded-lg border cursor-pointer ${
                modoLoginAdmin ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'text-gray-400 border-gray-700'
              }`}
            >
              {modoLoginAdmin ? 'Admin Ativo' : 'Área do Admin'}
            </button>
          </div>
          {erroLogin && <div className="mb-4 p-2.5 bg-red-900/40 text-red-200 text-xs rounded border border-red-500/40">{erroLogin}</div>}
          <form onSubmit={lidarComLogin} className="space-y-4">
            <input
              type="text"
              required
              placeholder="nome.sobrenome"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#5390f5]"
            />
            <input
              type="password"
              required
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#5390f5]"
            />
            <button type="submit" className="w-full py-3 bg-[#5390f5] hover:bg-[#437de0] text-white rounded-xl font-bold text-sm cursor-pointer transition shadow-lg">
              Entrar no sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. TELA HUB
  if (telaAtiva === 'hub') {
    return (
      <div className="min-h-screen bg-[#111922] text-white p-6 md:p-12 flex flex-col justify-between font-sans">
        <header className="flex justify-between items-center max-w-6xl mx-auto w-full pb-6 border-b border-gray-800">
          <span className="text-sm font-semibold text-white">{usuario.nome}</span>
          <button onClick={fazerLogout} className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer bg-[#1c2936] px-3 py-1.5 rounded-lg border border-gray-700">
            <LogOut size={14} /> Sair
          </button>
        </header>

        <div className="max-w-4xl mx-auto text-center my-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[#dce8eb]">Selecione o módulo de trabalho</h2>
          <p className="text-sm text-gray-400 mb-8">Escolha abaixo onde deseja atuar no sistema de engenharia.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div onClick={() => setTelaAtiva('revisoes')} className="bg-[#1c2936] p-8 rounded-3xl border border-gray-800 cursor-pointer hover:border-[#84cc16] transition shadow-xl group">
              <h3 className="text-2xl font-bold text-[#84cc16] mb-2 group-hover:underline">Revisões de RPFO</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Dashboard executivo de rodovias e valores atualizados.</p>
            </div>
            <div onClick={() => setTelaAtiva('calendario')} className="bg-[#1c2936] p-8 rounded-3xl border border-gray-800 cursor-pointer hover:border-[#5390f5] transition shadow-xl group">
              <h3 className="text-2xl font-bold text-[#5390f5] mb-2 group-hover:underline">Calendário</h3>
              <p className="text-xs text-gray-400 leading-relaxed">Cronograma de prazos, vistorias e pareceres.</p>
            </div>
          </div>
        </div>
        <footer className="text-center text-xs text-gray-500 pt-6">Oliveira Engenharia</footer>
      </div>
    );
  }

  // 3. DASHBOARD DE REVISÕES
  if (telaAtiva === 'revisoes') {
    return (
      <div className="min-h-screen bg-[#0d141c] text-white p-4 md:p-8 font-sans">
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-8 border-b border-gray-800">
          <button onClick={() => setTelaAtiva('hub')} className="text-xs bg-[#16212e] hover:bg-gray-800 px-4 py-2 rounded-xl border border-gray-700 cursor-pointer transition">
            ← Voltar ao Início
          </button>

          <button
            type="button"
            onClick={() => setModalNovaRevisao(true)}
            className="bg-[#84cc16] hover:bg-[#72b412] text-black py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition"
          >
            <Plus size={16} />
            <span>Nova Revisão (RPFO)</span>
          </button>
        </header>

        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Portfólio de RPFOs</h2>
              <p className="text-xs text-gray-400 mt-1">Gerenciamento completo das revisões de projeto em fase de obras.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listaRevisoes.map((rev) => (
              <div key={rev.id} className="bg-[#16212e] border border-gray-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#84cc16]/20 text-[#84cc16]">
                      {rev.modalidade || 'Rodovia'}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{rev.contrato}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{rev.br}</h3>
                  <p className="text-xs text-gray-400 mt-1">{rev.tipoObra}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center text-xs">
                  <span className="text-gray-400">Status: <strong className="text-amber-400">{rev.statusGeral}</strong></span>
                  <span className={`font-mono font-bold ${rev.ehPositivo ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {rev.percentual}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL CADASTRAR NOVA RPFO */}
        {modalNovaRevisao && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Cadastrar Nova RPFO</h3>
                    <p className="text-xs text-gray-400">Insira os dados orçamentários do trecho</p>
                  </div>
                </div>
                <button onClick={() => setModalNovaRevisao(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarNovaRevisao} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Identificação da Obra / Trecho</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: BR-230/PA ou BR-101/SC"
                    value={formNovaRpfo.br}
                    onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, br: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Preço Inicial (PI)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 350.000.000,00"
                      value={formNovaRpfo.precoInicial}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, precoInicial: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">PI + RPFO Final</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 375.000.000,00"
                      value={formNovaRpfo.precoFinal}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, precoFinal: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button type="button" onClick={() => setModalNovaRevisao(false)} className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-xs font-semibold cursor-pointer transition">
                    Cancelar
                  </button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#84cc16] hover:bg-[#72b412] text-black rounded-xl text-xs font-bold cursor-pointer transition shadow-lg">
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

  // 4. TELA CALENDÁRIO
  if (telaAtiva === 'calendario') {
    return (
      <div className="min-h-screen bg-[#111922] text-white p-4 md:p-8 font-sans">
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-6 border-b border-gray-800">
          <button onClick={() => setTelaAtiva('hub')} className="text-xs bg-[#1c2936] hover:bg-gray-800 px-3 py-2 rounded-xl border border-gray-700 cursor-pointer transition">
            ← Voltar ao Início
          </button>
          <button
            type="button"
            onClick={() => setModalNovaRevisao(true)}
            className="bg-[#84cc16] hover:bg-[#72b412] text-black py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition"
          >
            <Plus size={15} />
            <span>Nova RPFO</span>
          </button>
        </header>

        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Calendário Operacional</h2>
          <p className="text-xs text-gray-400">Acompanhe os prazos e acontecimentos das rodovias.</p>
        </div>

        {/* MODAL CADASTRAR NOVA RPFO NO CALENDÁRIO */}
        {modalNovaRevisao && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700">
                <h3 className="text-lg font-bold text-white">Cadastrar Nova RPFO</h3>
                <button onClick={() => setModalNovaRevisao(false)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarNovaRevisao} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Identificação da Obra / Trecho</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: BR-230/PA"
                    value={formNovaRpfo.br}
                    onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, br: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                  />
                </div>

                <div className="pt-3 flex gap-3">
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

  return null;
}