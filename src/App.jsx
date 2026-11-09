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
    descricao: 'Houve um despacho (26346144) do DNIT SEDE/DAQ para CGOB (22.10.2026) onde teve a aprovação jurídica parcial com veto a itens novos de escopo. Itens Vetados: Inclusão dos Produtos 07A, 07B e 07C (serviços vinculados à sinalização náutica). Além disso foi pedido uma revisão da planilha orçamentária e da memória de cálculo, com a consequente reapuração do valor e do percentual do acréscimo contratual. Houve no mesmo dia outro despacho (26348483), agora do DNIT SEDE/DAQ/CGOB para COVIAS. Nela fala que a assessoria jurídica emitiu parecer com aprovação apenas parcial do pleito, impondo travas e exigindo correções técnicas e orçamentárias imediatas antes que o aditivo possa tramitar. Impossibilidade jurídica: inclusão dos Produtos 07A, 07B e 07C (serviços vinculados à sinalização náutica). A PFE entendeu que esses itens extrapolam ou alteram indevidamente o objeto/escopo originalmente licitado.'
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
    descricao: 'Houve um despacho do Serviço de Construção Terrestre da Superintendência Regional do DNIT no Rio Grande do Norte (SRRN/COENGE - CAF - RN/SCT-RN) (26360536) manifesta concordância formal com a 1ª RPFO, remetendo o processo à Coordenação de Engenharia (COENGE) para emissão de parecer técnico conclusivo e continuidade dos trâmites de aprovação. Disciplinas Afetadas: Alterações de quantitativos e inserção de preços novos nas frentes de terraplenagem, drenagem e pavimentação, em virtude de divergências geotécnicas do subleito, distribuição de massas de terraplenagem e adequação estrutural identificadas em campo. Reflexo Financeiro: Valor Inicial Contratado: R$ 367.039.090,72. Novo Valor Global Proposto: R$ 438.798.255,14. Acréscimo Bruto: R$ 71.759.164,42 (+19,55% sobre o valor inicial).'
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
    descricao: 'Carta (23.10.2026) pela SRBA para DIR: "...Diante do exposto," "...encaminham-se os autos à DIR, para prosseguimento da tramitação e adoção das providências subsequentes previstas na referida Instrução Normativa." (26359006)'
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
    descricao: 'O DNIT enviou uma minuta (23.10.2026) Ressaltando que o DNIT não autorizou a paralisação pelo período solicitado, tampouco anuiu à suspensão integral dos serviços nas condições pretendidas. Desse modo, o período em que a empresa permaneceu sem executar as atividades contratuais não implica reconhecimento ou aceitação da paralisação pela Administração, nem afasta as obrigações assumidas pela contratada. Determinando assim, a imediata retomada da execução dos serviços contando 5 dias a partir de hoje. (26351695)'
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
    descricao: '(26359092) A Superintendência Regional ratifica o parecer da fiscalização (UL de Cruz Alta/RS), destacando que: 1. As justificativas climáticas não sustentam a suspensão integral, pois existem frentes de serviço passíveis de execução que independem de aprovação prévia de RPFO; 2. A paralisação não foi autorizada pelo DNIT, o que já motivou abertura de Processo Administrativo de Apuração de Responsabilidade (PAAR); 3. Determina a retomada imediata das obras, fixando prazo de 5 (cinco) dias úteis para a construtora apresentar cronograma de remobilização, plano de retomada e indicação do engenheiro responsável/preposto, sob pena de instauração de processo de rescisão contratual.'
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
    descricao: '(26392719) Emissor: Consórcio CLC/CONSERVA/FP, assinada pelo representante legal e Engenheiro Civil Manfrini Alexandre Gondim. Destinatário: Diretoria de Infraestrutura Rodoviária do DNIT (DIR), aos cuidados do Coordenador de Obras de Construção Rodoviária, Eng.º Alan Max Silva Nunes. Assunto: Prestação de esclarecimentos técnicos complementares e reencaminhamento de nova versão da 1ª Revisão de Projeto em Fase de Obras (RPFO) da rodovia BR-080/DF (km 0,00 ao km 24,60; Contrato nº 00 00680/2023).'
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
    descricao: '(28/10/2026) Foi encaminhado a RPFO para CGCONT. (26388715)'
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
    descricao: 'Em 28/10/2026 saiu o Parecer Técnico Resumido de RPFO 26409924 "manifestamo-nos FAVORAVELMENTE à 1ª RPFO..."'
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
  const podeEditar = usuario?.perfil === 'admin' || (usuario?.perfil === 'usuario' && usuario?.nivelPermissao === 'editar');
  const [telaAtiva, setTelaAtiva] = useState('hub');

  // Autenticação com nome.sobrenome
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroLogin, setErroLogin] = useState('');
  const [modoLoginAdmin, setModoLoginAdmin] = useState(false);
  const [chaveAdminMestre, setChaveAdminMestre] = useState('');

  // Calendário com persistência em localStorage
  const [indiceMes, setIndiceMes] = useState(0); // Inicia diretamente em Outubro 2026
  const [diaSelecionado, setDiaSelecionado] = useState(28);
  const [eventos, setEventos] = useState(() => {
    const salvo = localStorage.getItem('app_eventos_calendario_oficial');
    return salvo ? JSON.parse(salvo) : EVENTOS_INICIAIS;
  });

  const [modalNovoEvento, setModalNovoEvento] = useState(false);
  const [eventoPopUp, setEventoPopUp] = useState(null);
  const [filtroRpfoAtivo, setFiltroRpfoAtivo] = useState(null);

  // Gestão de Rodovias/REFs
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
  const [novoHorario, setNovoHorario] = useState('14:00');
  const [novoDescricao, setNovoDescricao] = useState('');

  const [eventoEmEdicao, setEventoEmEdicao] = useState(null);
  const [eventoParaExcluir, setEventoParaExcluir] = useState(null);

  // Estados do Dashboard de Revisões com persistência
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
        rpfosPermitidas: 'todas', // 'todas' ou array de IDs
        nivelPermissao: 'editar' // 'editar' ou 'visualizar'
      },
      { 
        id: 2, 
        nome: 'Fiscal DNIT Sede', 
        usuario: 'fiscal.dnit', 
        perfil: 'usuario', 
        cargo: 'Fiscal Técnico Contratual', 
        status: 'offline', 
        ultimoAcesso: 'Ontem', 
        ip: '192.168.1.115',
        rpfosPermitidas: 'todas',
        nivelPermissao: 'visualizar'
      }
    ];
  });

  // Estados para gerenciar o modal de criar/editar usuário
  const [modalUsuarioAberto, setModalUsuarioAberto] = useState(false);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null); // null = criando novo, objeto = editando
  const [formUsuario, setFormUsuario] = useState({
    nome: '',
    usuario: '',
    senha: '',
    nivelPermissao: 'visualizar',
    modulosPermitidos: ['calendario', 'revisoes', 'refs'],
    rpfosPermitidas: []
  });

  React.useEffect(() => {
    localStorage.setItem('app_usuarios_controle_acesso', JSON.stringify(listaUsuariosAcesso));
  }, [listaUsuariosAcesso]);
  const [rpfosSelecionadasDashIds, setRpfosSelecionadasDashIds] = useState([]);
  const [filtroModalidadeDash, setFiltroModalidadeDash] = useState('Todos');
  const [filtroEmpresaDash, setFiltroEmpresaDash] = useState('Todas');
  const [revisaoEmEdicao, setRevisaoEmEdicao] = useState(null);
  const [revisaoParaExcluir, setRevisaoParaExcluir] = useState(null);
  const [modalNovaRevisao, setModalNovaRevisao] = useState(false);

  // Estado para Especificações da RPFO
  const [idRpfoEmEspecificacao, setIdRpfoEmEspecificacao] = useState(null);
  const [novoItemAdequadoTexto, setNovoItemAdequadoTexto] = useState('');
  const [exportando, setExportando] = useState(false);
  const [menuExportarAberto, setMenuExportarAberto] = useState(false);

  const [formNovaRpfo, setFormNovaRpfo] = useState({
    br: '', modalidade: 'Rodovia', statusGeral: 'A Iniciar', precoInicial: '', precoFinal: '', acumulado: '', percentual: '', contrato: '', processoSei: '', contratada: 'CLC', observacao: ''
  });

  // Cores personalizadas escolhidas para cada RPFO guardadas no disco do browser
  const [coresCustomizadas, setCoresCustomizadas] = useState(() => {
    const salvo = localStorage.getItem('app_cores_rpfo_oficial');
    return salvo ? JSON.parse(salvo) : {};
  });
  const [rpfoSelecionandoCor, setRpfoSelecionandoCor] = useState(null);

  // Grava automaticamente no localStorage sempre que houver alterações
  React.useEffect(() => {
    localStorage.setItem('app_eventos_calendario_oficial', JSON.stringify(eventos));
  }, [eventos]);

  React.useEffect(() => {
    localStorage.setItem('app_lista_revisoes_oficial', JSON.stringify(listaRevisoes));
  }, [listaRevisoes]);

  React.useEffect(() => {
    localStorage.setItem('app_cores_rpfo_oficial', JSON.stringify(coresCustomizadas));
  }, [coresCustomizadas]);

  // Sincronização automática entre as RPFOs e a legenda respeitando a cor escolhida
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

  const adicionarEtapaRPFO = (revId) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const novas = [...rev.etapas, { nome: 'Nova Etapa', data: 'Não iniciado', status: 'nao_iniciado' }];
      return { ...rev, etapas: novas };
    }));
  };

  const removerEtapaRPFO = (revId, etapaIndex) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      if (rev.etapas.length <= 1) return rev;
      const novas = rev.etapas.filter((_, idx) => idx !== etapaIndex);
      return { ...rev, etapas: novas };
    }));
  };

  const renomearEtapaRPFO = (revId, etapaIndex, novoNome) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const novas = [...rev.etapas];
      novas[etapaIndex] = { ...novas[etapaIndex], nome: novoNome };
      return { ...rev, etapas: novas };
    }));
  };

  const moverEtapaRPFO = (revId, etapaIndex, direcao) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const novoIndex = direcao === 'esq' ? etapaIndex - 1 : etapaIndex + 1;
      if (novoIndex < 0 || novoIndex >= rev.etapas.length) return rev;

      const novas = [...rev.etapas];
      const itemMovido = novas[etapaIndex];
      novas.splice(etapaIndex, 1);
      novas.splice(novoIndex, 0, itemMovido);

      return { ...rev, etapas: novas };
    }));
  };

  const alternarStatusEtapa = (revId, etapaIndex) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;

      const novasEtapas = [...rev.etapas];
      const etapaAtual = novasEtapas[etapaIndex];
      const statusAtual = etapaAtual.status;

      if (statusAtual === 'nao_iniciado') {
        novasEtapas[etapaIndex] = { ...etapaAtual, status: 'andamento', data: 'Em andamento' };
      } else if (statusAtual === 'andamento') {
        const hoje = new Date();
        const d = String(hoje.getDate()).padStart(2, '0');
        const m = String(hoje.getMonth() + 1).padStart(2, '0');
        const a = hoje.getFullYear();
        novasEtapas[etapaIndex] = { ...etapaAtual, status: 'concluido', data: `${d}/${m}/${a}` };
      } else if (statusAtual === 'concluido') {
        novasEtapas[etapaIndex] = { ...etapaAtual, status: 'nd', data: 'S/ supervisora' };
      } else {
        novasEtapas[etapaIndex] = { ...etapaAtual, status: 'nao_iniciado', data: 'Não iniciado' };
      }

      return { ...rev, etapas: novasEtapas };
    }));
  };

  const lidarComMudancaDataEtapa = (revId, etapaIndex, valor) => {
    const apenasNumeros = valor.replace(/\D/g, '').slice(0, 8);
    let dataFormatada = apenasNumeros;

    if (apenasNumeros.length > 2 && apenasNumeros.length <= 4) {
      dataFormatada = `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2)}`;
    } else if (apenasNumeros.length > 4) {
      dataFormatada = `${apenasNumeros.slice(0, 2)}/${apenasNumeros.slice(2, 4)}/${apenasNumeros.slice(4)}`;
    }

    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const novasEtapas = [...rev.etapas];
      novasEtapas[etapaIndex] = { ...novasEtapas[etapaIndex], data: dataFormatada };
      return { ...rev, etapas: novasEtapas };
    }));
  };

  const alterarStatusGeralRPFO = (revId, novoStatus) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      return { ...rev, statusGeral: novoStatus };
    }));
  };

  const alternarTagCGU = (revId) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const temCGU = !!rev.observacao && rev.observacao.includes('CGU');
      return {
        ...rev,
        observacao: temCGU ? '' : 'Atendendo a solicitação da CGU'
      };
    }));
  };

  const atualizarLinkDrive = (revId, novoLink) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      return { ...rev, linkDrive: novoLink };
    }));
  };

  const alternarExpansaoCard = (id) => {
    if (cardsExpandidosIds.includes(id)) {
      setCardsExpandidosIds(cardsExpandidosIds.filter(cardId => cardId !== id));
    } else {
      if (cardsExpandidosIds.length >= 2) {
        setCardsExpandidosIds([cardsExpandidosIds[1], id]);
      } else {
        setCardsExpandidosIds([...cardsExpandidosIds, id]);
      }
    }
  };

  const alternarSelecaoRPFO = (id) => {
    if (rpfosSelecionadasDashIds.includes(id)) {
      setRpfosSelecionadasDashIds(rpfosSelecionadasDashIds.filter(cardId => cardId !== id));
    } else {
      setRpfosSelecionadasDashIds([...rpfosSelecionadasDashIds, id]);
    }
  };

  const selecionarTodasRPFOs = () => {
    setRpfosSelecionadasDashIds(listaRevisoes.map(r => r.id));
  };

  const deselecionarTodasRPFOs = () => {
    setRpfosSelecionadasDashIds([]);
  };

  const alternarFiltroRpfo = (rpfoId) => {
    setFiltroRpfoAtivo(filtroRpfoAtivo === rpfoId ? null : rpfoId);
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

  const mudarMes = (direcao) => {
    if (direcao === 'ant' && indiceMes > 0) {
      setIndiceMes(indiceMes - 1);
      setDiaSelecionado(1);
    } else if (direcao === 'prox' && indiceMes < MESES_DISPONIVEIS.length - 1) {
      setIndiceMes(indiceMes + 1);
      setDiaSelecionado(1);
    }
  };

  const salvarAcontecimento = (e) => {
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

    setEventos([...eventos, novoItem]);
    setNovoTitulo('');
    setNovoProcessoSei('');
    setNovoDescricao('');
    setModalNovoEvento(false);
  };

  const salvarEdicaoAcontecimento = (e) => {
    e.preventDefault();
    if (!eventoEmEdicao || !eventoEmEdicao.titulo?.trim()) return;

    setEventos(prev => prev.map(ev => 
      ev.id === eventoEmEdicao.id ? { ...eventoEmEdicao, dia: parseInt(eventoEmEdicao.dia, 10) } : ev
    ));
    setEventoEmEdicao(null);
  };

  const confirmarExclusaoAcontecimento = () => {
    if (!eventoParaExcluir) return;
    setEventos(prev => prev.filter(ev => ev.id !== eventoParaExcluir.id));
    if (eventoPopUp?.id === eventoParaExcluir.id) setEventoPopUp(null);
    setEventoParaExcluir(null);
  };

  const confirmarExclusaoRef = () => {
    if (!itemRefParaExcluir) return;
    setListaRodoviasRefs(prev => prev.filter(item => item.id !== itemRefParaExcluir.id));
    setItemRefParaExcluir(null);
  };

  const salvarNovaRef = (e) => {
    e.preventDefault();
    if (!novaRefNome.trim()) return;

    const idGerado = novaRefNome.trim().toUpperCase();
    const novoItemRef = {
      id: idGerado,
      tipos: tiposSelecionados,
      nome: novaRefNome.trim(),
      corBg: novaRefCor.corBg,
      border: novaRefCor.border,
      hex: novaRefCor.hex
    };

    setListaRodoviasRefs([...listaRodoviasRefs, novoItemRef]);
    setNovaRefNome('');
    setTiposSelecionados(['RPFO']);
    setModalAdicionarRef(false);
  };

  const salvarEdicaoRef = (e) => {
    e.preventDefault();
    if (!itemRefEmEdicao.nome.trim()) return;

    setListaRodoviasRefs(listaRodoviasRefs.map(item => 
      item.id === itemRefEmEdicao.idOriginal ? {
        ...item,
        nome: itemRefEmEdicao.nome.trim(),
        tipos: itemRefEmEdicao.tipos || ['RPFO'],
        corBg: itemRefEmEdicao.corBg,
        border: itemRefEmEdicao.border,
        hex: itemRefEmEdicao.hex
      } : item
    ));

    setItemRefEmEdicao(null);
  };

  const salvarEdicaoRevisao = (e) => {
    e.preventDefault();
    if (!revisaoEmEdicao.br.trim()) return;

    setListaRevisoes(prev => prev.map(r => r.id === revisaoEmEdicao.id ? revisaoEmEdicao : r));
    setRevisaoEmEdicao(null);
  };

  const confirmarExclusaoRevisao = () => {
    if (!revisaoParaExcluir) return;
    setListaRevisoes(listaRevisoes.filter(r => r.id !== revisaoParaExcluir.id));
    setRpfosSelecionadasDashIds(rpfosSelecionadasDashIds.filter(id => id !== revisaoParaExcluir.id));
    setCardsExpandidosIds(cardsExpandidosIds.filter(id => id !== revisaoParaExcluir.id));
    if (idRpfoEmEspecificacao === revisaoParaExcluir.id) {
      setIdRpfoEmEspecificacao(null);
      setTelaAtiva('revisoes');
    }
    setRevisaoParaExcluir(null);
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
{/* MODAL CADASTRAR NOVA RPFO NO DASHBOARD */}
        {modalNovaRevisao && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Cadastrar Nova RPFO</h3>
                    <p className="text-xs text-gray-400">Insira os dados orçamentários do trecho</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalNovaRevisao(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarNovaRevisao} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Tipo de Modal / Obra
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-[#15202b] rounded-xl border border-gray-700">
                    {[
                      { id: 'Rodovia', label: 'Rodovia' },
                      { id: 'Hidrovia', label: 'Hidrovia' },
                      { id: 'Ferrovia', label: 'Ferrovia' }
                    ].map((mod) => {
                      const ativa = (formNovaRpfo.modalidade || 'Rodovia') === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setFormNovaRpfo({ ...formNovaRpfo, modalidade: mod.id })}
                          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            ativa
                              ? mod.id === 'Rodovia' ? 'bg-[#84cc16] text-black shadow-md'
                              : mod.id === 'Hidrovia' ? 'bg-cyan-500 text-black shadow-md'
                              : 'bg-amber-500 text-black shadow-md'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                          }`}
                        >
                          {ativa && <Check size={12} strokeWidth={3} />}
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Identificação da Obra / Trecho
                  </label>
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

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Empresa Contratada</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: CLC, COESA"
                      value={formNovaRpfo.contratada}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, contratada: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Contrato nº</label>
                    <input
                      type="text"
                      placeholder="Ex: 05 00287/2025"
                      value={formNovaRpfo.contrato}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, contrato: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Processo SEI</label>
                    <input
                      type="text"
                      placeholder="Ex: 50605.001211/2026-76"
                      value={formNovaRpfo.processoSei}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, processoSei: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalNovaRevisao(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-700/60 hover:bg-gray-700 text-gray-300 text-sm font-medium transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#72b412] text-black text-sm font-bold transition shadow cursor-pointer"
                  >
                    Salvar RPFO
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
  const [itemIndexAdicionandoSub, setItemIndexAdicionandoSub] = useState(null);
  const [novoSubitemTexto, setNovoSubitemTexto] = useState('');

  const adicionarItemAdequado = (revId) => {
    if (!novoItemAdequadoTexto.trim()) return;
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const itensAtuais = rev.itensAdequados || [];
      const novoObjetoItem = {
        titulo: novoItemAdequadoTexto.trim(),
        subitens: []
      };
      return { ...rev, itensAdequados: [...itensAtuais, novoObjetoItem] };
    }));
    setNovoItemAdequadoTexto('');
  };

  const removerItemAdequado = (revId, indexParaRemover) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      return { ...rev, itensAdequados: (rev.itensAdequados || []).filter((_, idx) => idx !== indexParaRemover) };
    }));
  };

  const adicionarSubitemAdequado = (revId, itemIndex) => {
    if (!novoSubitemTexto.trim()) return;
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const novosItens = (rev.itensAdequados || []).map((item, idx) => {
        if (idx !== itemIndex) return item;
        const itemObj = typeof item === 'string' ? { titulo: item, subitens: [] } : { ...item, subitens: item.subitens || [] };
        return {
          ...itemObj,
          subitens: [...itemObj.subitens, novoSubitemTexto.trim()]
        };
      });
      return { ...rev, itensAdequados: novosItens };
    }));
    setNovoSubitemTexto('');
    setItemIndexAdicionandoSub(null);
  };

  const removerSubitemAdequado = (revId, itemIndex, subIndexParaRemover) => {
    setListaRevisoes(prev => prev.map(rev => {
      if (rev.id !== revId) return rev;
      const novosItens = (rev.itensAdequados || []).map((item, idx) => {
        if (idx !== itemIndex) return item;
        const itemObj = typeof item === 'string' ? { titulo: item, subitens: [] } : item;
        return {
          ...itemObj,
          subitens: (itemObj.subitens || []).filter((_, sIdx) => sIdx !== subIndexParaRemover)
        };
      });
      return { ...rev, itensAdequados: novosItens };
    }));
  };

  const exportarTelaEspecificacoes = async (formato, obraNome) => {
    setExportando(true);
    setMenuExportarAberto(false);

    const elemento = document.getElementById('painel-especificacoes-exportar');
    if (!elemento) {
      setExportando(false);
      return;
    }

    const nomeArquivo = `RPFO_${obraNome ? obraNome.replace(/[^a-zA-Z0-9]/g, '_') : 'Ficha_Tecnica'}`;

    try {
      const dataUrl = await toJpeg(elemento, {
        quality: 0.98,
        backgroundColor: '#0b1219',
        pixelRatio: 2,
        style: {
          margin: '0',
          padding: '24px'
        }
      });

      if (formato === 'jpg') {
        const link = document.createElement('a');
        link.download = `${nomeArquivo}.jpg`;
        link.href = dataUrl;
        link.click();
      } else if (formato === 'pdf') {
        const janelaImpressao = window.open('', '_blank');
        if (janelaImpressao) {
          janelaImpressao.document.write(`
            <html>
              <head>
                <title>${nomeArquivo}</title>
                <style>
                  @page {
                    size: landscape;
                    margin: 0;
                  }
                  body {
                    margin: 0;
                    padding: 0;
                    background-color: #0b1219;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                  }
                  img {
                    width: 100%;
                    max-height: 100vh;
                    object-fit: contain;
                    display: block;
                  }
                </style>
              </head>
              <body>
                <img src="${dataUrl}" onload="window.print(); window.close();" />
              </body>
            </html>
          `);
          janelaImpressao.document.close();
        }
      }
    } catch (err) {
      console.error('Falha ao exportar:', err);
    } finally {
      setExportando(false);
    }
  };

  // 1. TELA DE LOGIN
  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#111922] flex items-center justify-center p-4 md:p-8 font-sans">
        <div className="w-full max-w-5xl bg-[#1c2936] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 grid grid-cols-1 md:grid-cols-2">
          
          <div className="relative min-h-[340px] md:min-h-[620px] w-full bg-[#15202b]">
            <img
              src="/rodovia.jpg"
              alt="Rodovia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111922]/90 via-[#1c2936]/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <p className="text-xs text-gray-300">
                Sistema de gestão, acompanhamento e revisão de RPFOs rodoviárias.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-between bg-[#1c2936]">
            {/* BOTÃO DISCRETO NO TOPO DIREITO: ÁREA DO ADMIN */}
            <div className="flex justify-end items-center">
              <button
                type="button"
                onClick={() => {
                  setModoLoginAdmin(!modoLoginAdmin);
                  setErroLogin('');
                  setSenha('');
                }}
                className={`text-[11px] transition-all duration-300 cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ${
                  modoLoginAdmin 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-300 border-transparent hover:border-gray-700/50 hover:bg-[#15202b]'
                }`}
                title="Acesso de gerenciamento do sistema"
              >
                <ShieldCheck size={13} className={modoLoginAdmin ? 'text-emerald-400' : 'opacity-40'} />
                <span>{modoLoginAdmin ? 'Sair da Área Admin' : 'Área do Administrador'}</span>
              </button>
            </div>

            <div className="my-auto py-6">
              <div className="mb-6 flex items-center justify-between">
                <img
                  src="/logo.png"
                  alt="Oliveira Engenharia"
                  className="h-10 w-auto object-contain"
                />

                {modoLoginAdmin && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-in fade-in">
                    Modo Master Ativado
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h1 className="text-3xl font-bold text-[#dce8eb] tracking-tight">
                  {modoLoginAdmin ? 'Acesso Administrativo' : 'Faça seu login'}
                </h1>
                <p className="text-xs text-gray-400 mt-2">
                  {modoLoginAdmin 
                    ? 'Autenticação reservada para gestão de infraestrutura e sessões ativas.' 
                    : 'Acesse o portfólio de revisões e acompanhe os processos da sua rodovia.'}
                </p>
              </div>

              {erroLogin && (
                <div className="mb-4 p-2.5 rounded bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
                  {erroLogin}
                </div>
              )}

              <form onSubmit={lidarComLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    {modoLoginAdmin ? 'Identificação do Administrador' : 'Usuário de Acesso'}
                  </label>
                  <div className="relative flex items-center">
                    <Mail size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="nome.sobrenome"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 bg-[#15202b] border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                        modoLoginAdmin ? 'border-emerald-500/50 focus:border-emerald-400' : 'border-gray-700 focus:border-[#5390f5]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    {modoLoginAdmin ? 'Chave de Acesso Admin' : 'Senha'}
                  </label>
                  <div className="relative flex items-center">
                    <Lock size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
                    <input
                      type={mostrarSenha ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 bg-[#15202b] border rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition ${
                        modoLoginAdmin ? 'border-emerald-500/50 focus:border-emerald-400' : 'border-gray-700 focus:border-[#5390f5]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute right-3.5 text-gray-400 hover:text-gray-200 transition cursor-pointer"
                    >
                      {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                

                <button
                  type="submit"
                  className={`w-full mt-2 py-3 px-4 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] ${
                    modoLoginAdmin
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/20'
                      : 'bg-[#5390f5] hover:bg-[#437de0] text-white shadow-lg shadow-[#5390f5]/20'
                  }`}
                >
                  <span>{modoLoginAdmin ? 'Acessar como Administrador' : 'Entrar no sistema'}</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div className="text-center pt-4 border-t border-gray-800 text-[11px] text-gray-500">
              Acesso restrito para administradores e empresas consorciadas.
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 2. TELA CENTRAL DE ESCOLHA (HUB)
  if (telaAtiva === 'hub') {
    const modulosDoUsuario = usuario.perfil === 'admin' 
      ? ['calendario', 'revisoes', 'refs'] 
      : (usuario.modulosPermitidos || ['calendario', 'revisoes', 'refs']);

    return (
      <div className="min-h-screen bg-[#111922] text-white p-6 md:p-12 flex flex-col justify-between font-sans">
        
        <header className="flex justify-between items-center max-w-6xl mx-auto w-full pb-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-semibold text-white">{usuario.nome}</span>
              <span className="block text-xs text-[#84cc16] font-mono capitalize">
                {usuario.perfil === 'admin' ? 'Administrador' : (usuario.nivelPermissao === 'editar' ? 'Editor' : 'Visualizador')}
              </span>
            </div>
            <button
              onClick={fazerLogout}
              className="p-2 bg-[#1c2936] hover:bg-red-950/40 border border-gray-700 rounded-lg text-gray-300 hover:text-red-400 transition cursor-pointer flex items-center gap-1.5 text-xs"
              title="Sair do sistema"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto w-full my-8 text-center flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#dce8eb] mb-4">
            Selecione o módulo de trabalho
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl leading-relaxed">
            {usuario.perfil === 'admin' 
              ? 'Consulte o cronograma, acompanhe o andamento das revisões ou gerencie os acessos do sistema.'
              : `Você possui acesso autorizado aos módulos liberados pelo administrador.`}
          </p>
        </div>

        <div className={`max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-${usuario.perfil === 'admin' ? '4' : Math.max(1, modulosDoUsuario.length)} gap-6 my-auto`}>
          
          {/* MÓDULO EXCLUSIVO DO ADMINISTRADOR: CONTROLE DE ACESSOS */}
          {usuario.perfil === 'admin' && (
            <div
              onClick={() => setTelaAtiva('usuarios')}
              className="group relative bg-[#1c2936] border border-gray-800 rounded-3xl p-7 flex flex-col justify-between h-[360px] cursor-pointer hover:border-emerald-500/80 hover:shadow-2xl transition duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-emerald-500/0 group-hover:bg-emerald-500 transition duration-300" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#15202b] flex items-center justify-center text-emerald-400 border border-gray-700/50 group-hover:scale-105 transition duration-300">
                    <ShieldCheck size={22} />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Admin Only
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition duration-300">
                  Controle de Acesso
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Gerenciamento de credenciais, monitoramento de quem está online em tempo real na rede e permissões.
                </p>
              </div>

              <div className="relative z-10 flex justify-between items-end pt-4 border-t border-gray-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-gray-300 font-medium">
                    <strong className="text-emerald-400 font-mono">
                      {listaUsuariosAcesso.filter(u => u.status === 'online').length}
                    </strong> online agora
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition duration-300" />
                </div>
              </div>
            </div>
          )}
          
          {/* MÓDULO CALENDÁRIO */}
          {modulosDoUsuario.includes('calendario') && (
            <div
              onClick={() => setTelaAtiva('calendario')}
              className="group relative bg-[#1c2936] border border-gray-800 rounded-3xl p-7 flex flex-col justify-between h-[360px] cursor-pointer hover:border-[#5390f5]/80 hover:shadow-2xl transition duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-[#5390f5]/0 group-hover:bg-[#5390f5] transition duration-300" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#15202b] flex items-center justify-center text-[#5390f5] mb-6 border border-gray-700/50">
                  <CalendarIcon size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#5390f5] transition duration-300">
                  Calendário
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Prazos operacionais, cronograma das vistorias, datas limite de entrega de relatórios e notificações.
                </p>
              </div>
              <div className="relative z-10 flex justify-between items-end pt-4">
                <span className="text-xs text-[#5390f5] font-semibold group-hover:underline">Acessar agenda</span>
                <div className="w-12 h-12 rounded-full bg-[#5390f5] text-white flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO REVISÕES DE RPFO */}
          {modulosDoUsuario.includes('revisoes') && (
            <div
              onClick={() => setTelaAtiva('revisoes')}
              className="group relative bg-[#1c2936] border border-gray-800 rounded-3xl p-7 flex flex-col justify-between h-[360px] cursor-pointer hover:border-[#84cc16]/80 hover:shadow-2xl transition duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-[#84cc16]/0 group-hover:bg-[#84cc16] transition duration-300" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#15202b] flex items-center justify-center text-[#84cc16] mb-6 border border-gray-700/50">
                  <FileSpreadsheet size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#84cc16] transition duration-300">
                  Revisões de RPFO
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Dashboard executivo de rodovias, valores atualizados, estágios de aprovação e pareceres.
                </p>
              </div>
              <div className="relative z-10 flex justify-between items-end pt-4">
                <span className="text-xs text-[#84cc16] font-semibold group-hover:underline">Ver processos</span>
                <div className="w-12 h-12 rounded-full bg-[#84cc16] text-black flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition duration-300" />
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO REFs CONTRATUAIS */}
          {modulosDoUsuario.includes('refs') && (
            <div
              onClick={() => setTelaAtiva('refs')}
              className="group relative bg-[#1c2936] border border-gray-800 rounded-3xl p-7 flex flex-col justify-between h-[360px] cursor-pointer hover:border-amber-400/80 hover:shadow-2xl transition duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-amber-400/0 group-hover:bg-amber-400 transition duration-300" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#15202b] flex items-center justify-center text-amber-400 mb-6 border border-gray-700/50">
                  <TrendingUp size={20} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition duration-300">
                  REFs Contratuais
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Processos de reequilíbrio econômico-financeiro, variações extraordinárias e composição de custos.
                </p>
              </div>
              <div className="relative z-10 flex justify-between items-end pt-4">
                <span className="text-xs text-amber-400 font-semibold group-hover:underline">Acessar dados</span>
                <div className="w-12 h-12 rounded-full bg-amber-400 text-black flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition duration-300" />
                </div>
              </div>
            </div>
          )}

        </div>

        <footer className="max-w-6xl mx-auto w-full text-center text-xs text-gray-500 pt-6">
          Oliveira Engenharia • Sistema de Gestão Rodoviária
        </footer>

      </div>
    );
  }
  if (telaAtiva === 'calendario') {
    const eventosDoMes = eventos.filter(
      ev => ev.mes === mesAtualObj.mes && ev.ano === mesAtualObj.ano
    );

    const eventosExibidosNoMes = filtroRpfoAtivo
      ? eventosDoMes.filter(ev => ev.rpfoId === filtroRpfoAtivo)
      : eventosDoMes;

    const eventosDoDia = eventosExibidosNoMes.filter(ev => ev.dia === diaSelecionado);
    const rpfoFiltradaObj = listaRodoviasRefs.find(r => r.id === filtroRpfoAtivo);

    return (
      <div className="min-h-screen bg-[#111922] text-white p-4 md:p-8 font-sans">
        
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-6 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setFiltroRpfoAtivo(null);
                setTelaAtiva('hub');
              }}
              className="text-gray-400 hover:text-white transition flex items-center gap-1.5 text-xs bg-[#1c2936] px-3 py-2 rounded-xl border border-gray-700 cursor-pointer"
            >
              <ChevronLeft size={16} /> Voltar ao Início
            </button>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
              <span className="text-sm font-bold text-gray-300">| Calendário Operacional</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {podeEditar && (
              <>
                <button
                  type="button"
                  onClick={() => setModalNovaRevisao(true)}
                  className="bg-[#84cc16] hover:bg-[#72b412] text-black py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Nova RPFO</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setNovoTitulo('');
                    setNovoProcessoSei('');
                    setNovoDescricao('');
                    if (filtroRpfoAtivo) setNovoRpfo(filtroRpfoAtivo);
                    setModalNovoEvento(true);
                  }}
                  className="bg-[#5390f5] hover:bg-[#437de0] text-white py-2 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-lg cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Adicionar Acontecimento</span>
                </button>
              </>
            )}
            <button
              onClick={fazerLogout}
              className="p-2 bg-[#1c2936] hover:bg-red-950/40 border border-gray-700 rounded-xl text-gray-300 hover:text-red-400 transition cursor-pointer"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <main className="lg:col-span-8 bg-[#182330] rounded-3xl p-6 border border-gray-800/80 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-700/50 gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#dce8eb] tracking-tight">
                    {mesAtualObj.nome}
                  </h2>

                  {filtroRpfoAtivo && (
                    <div className="flex items-center gap-2 bg-[#1c2936] border border-[#5390f5]/50 px-2.5 py-1 rounded-full animate-in fade-in">
                      <span className={`w-2.5 h-2.5 rounded-full ${rpfoFiltradaObj?.corBg || 'bg-gray-400'}`} />
                      <span className="text-[11px] font-bold text-white">
                        {rpfoFiltradaObj?.nome || filtroRpfoAtivo}
                      </span>
                      <button
                        onClick={() => setFiltroRpfoAtivo(null)}
                        className="text-gray-400 hover:text-white ml-1 cursor-pointer"
                        title="Limpar filtro e voltar a exibir todos"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-xs text-gray-400 block mt-1">
                  {filtroRpfoAtivo 
                    ? `Exibindo apenas os acontecimentos de ${rpfoFiltradaObj?.nome || filtroRpfoAtivo}. Clique novamente na legenda para desativar.`
                    : 'Cronograma de entregas, pareceres e vistorias de todas as rodovias'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => mudarMes('ant')}
                  disabled={indiceMes === 0}
                  className={`p-2 rounded-lg border border-gray-700 transition ${
                    indiceMes === 0 ? 'opacity-30 cursor-not-allowed bg-transparent text-gray-600' : 'bg-[#1c2936] text-gray-300 hover:text-white cursor-pointer'
                  }`}
                  title="Mês Anterior"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => mudarMes('prox')}
                  disabled={indiceMes === MESES_DISPONIVEIS.length - 1}
                  className={`p-2 rounded-lg border border-gray-700 transition ${
                    indiceMes === MESES_DISPONIVEIS.length - 1 ? 'opacity-30 cursor-not-allowed bg-transparent text-gray-600' : 'bg-[#1c2936] text-gray-300 hover:text-white cursor-pointer'
                  }`}
                  title="Próximo Mês"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-gray-400 mb-3 tracking-wider uppercase">
              <span>Dom</span>
              <span>Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {espacosVaziosIniciais.map((_, idx) => (
                <div key={`vazio-${idx}`} className="min-h-[88px] md:min-h-[100px] p-2 rounded-2xl bg-[#111922]/40 border border-transparent" />
              ))}

              {diasArray.map((dia) => {
                const eventosDesseDia = eventosExibidosNoMes.filter(ev => ev.dia === dia);
                const isSelected = dia === diaSelecionado;

                return (
                  <div
                    key={dia}
                    onClick={() => setDiaSelecionado(dia)}
                    className={`min-h-[88px] md:min-h-[100px] p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#223347] border-[#5390f5] shadow-lg shadow-[#5390f5]/10'
                        : 'bg-[#15202b] border-gray-800/70 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${isSelected ? 'text-[#5390f5]' : 'text-gray-300'}`}>
                        {dia}
                      </span>
                      {eventosDesseDia.length > 0 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5390f5]" />
                      )}
                    </div>

                    <div className="space-y-1 mt-1">
                      {eventosDesseDia.slice(0, 2).map((ev) => {
                        const configCor = listaObrasSincronizadas.find(c => c.id === ev.rpfoId || c.brCompleta === ev.rpfoId) || { corBg: 'bg-gray-600' };
                        return (
                          <div
                            key={ev.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDiaSelecionado(dia);
                              setEventoPopUp(ev);
                            }}
                            className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold truncate text-white ${configCor.corBg} hover:brightness-110 active:scale-95 transition cursor-pointer`}
                            title={`${ev.rpfoId} - ${ev.titulo}`}
                          >
                            {ev.rpfoId}
                          </div>
                        );
                      })}
                      {eventosDesseDia.length > 2 && (
                        <span className="text-[8px] text-gray-400 font-bold block text-right">
                          +{eventosDesseDia.length - 2} mais
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </main>

          <aside className="lg:col-span-4 space-y-6">
            
            <div className="bg-[#182330] rounded-3xl p-6 border border-gray-800 shadow-xl">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Acontecimentos</span>
                  <h3 className="text-lg font-bold text-white">Dia {diaSelecionado} ({mesAtualObj.nome.split(' ')[0]})</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1c2936] text-[#5390f5] flex items-center justify-center font-bold text-xs border border-gray-700">
                  {eventosDoDia.length}
                </div>
              </div>

              {eventosDoDia.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock size={28} className="mx-auto mb-2 opacity-40" />
                  <p className="text-xs">
                    {filtroRpfoAtivo 
                      ? `Nenhum registro para ${rpfoFiltradaObj?.nome || filtroRpfoAtivo} neste dia.` 
                      : 'Nenhum evento registrado nesta data.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {eventosDoDia.map((ev) => {
                    const configCor = listaObrasSincronizadas.find(c => c.id === ev.rpfoId || c.brCompleta === ev.rpfoId) || { corBg: 'bg-gray-600', border: 'border-gray-500' };
                    return (
                      <div
                        key={ev.id}
                        onClick={() => setEventoPopUp(ev)}
                        className={`p-4 rounded-2xl border ${configCor.border} bg-[#15202b] relative overflow-hidden cursor-pointer hover:border-white/50 transition group`}
                      >
                        <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${configCor.corBg}`} />
                        <div className="pl-2">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${configCor.corBg} text-white shadow-sm`}>
                              {ev.rpfoId}
                            </span>
                            
                            <div className="flex items-center gap-1.5 bg-[#1c2936] px-1.5 py-0.5 rounded-lg border border-gray-700/60">
                              <span className="text-[10px] font-mono text-gray-400 mr-1">{ev.horario}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEventoEmEdicao({ ...ev });
                                }}
                                className="text-gray-400 hover:text-[#5390f5] p-1 rounded transition hover:bg-gray-700/50"
                              >
                                <Edit3 size={13} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEventoParaExcluir(ev);
                                }}
                                className="text-gray-400 hover:text-red-400 p-1 rounded transition hover:bg-gray-700/50"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>

                          <h4 className="text-sm font-bold text-white mt-2 mb-1 group-hover:text-[#5390f5] transition">
                            {ev.titulo}
                          </h4>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {ev.descricao}
                          </p>
                          {ev.processoSei && (
                            <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                              SEI: {ev.processoSei}
                            </span>
                          )}
                          <span className="text-[10px] text-[#5390f5] font-semibold mt-2 block underline">
                            Ver explicação completa →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-[#182330] rounded-3xl p-6 border border-gray-800 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-[#84cc16]" />
                  <h3 className="text-sm font-bold text-white">RPFOs do Portfólio</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalNovaRevisao(true)}
                  className="text-xs font-semibold bg-[#84cc16]/20 hover:bg-[#84cc16] text-[#84cc16] hover:text-black px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={13} /> Nova RPFO
                </button>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1 relative">
                {listaObrasSincronizadas.map((item) => {
                  const estaAtiva = filtroRpfoAtivo === item.id;
                  const escolhendoEsta = rpfoSelecionandoCor === item.id;

                  return (
                    <div key={item.id} className="relative">
                      <div
                        onClick={() => alternarFiltroRpfo(item.id)}
                        className={`flex items-center justify-between text-xs p-2.5 rounded-xl border transition-all cursor-pointer ${
                          estaAtiva
                            ? 'bg-[#223347] border-[#5390f5] shadow-lg shadow-[#5390f5]/20 ring-1 ring-[#5390f5]'
                            : 'bg-[#15202b] border-gray-800/80 hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRpfoSelecionandoCor(escolhendoEsta ? null : item.id);
                            }}
                            className={`w-4 h-4 rounded-full shrink-0 ${item.corBg} hover:scale-125 transition-transform ring-2 ring-transparent hover:ring-white/80 cursor-pointer shadow-sm`}
                            title="Clique para escolher a cor desta RPFO"
                          />
                          <span className="font-semibold text-gray-200 truncate">{item.nome}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {estaAtiva && (
                            <span className="text-[9px] bg-[#5390f5] text-white font-bold px-2 py-0.5 rounded-full">
                              Filtrando
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRpfoSelecionandoCor(escolhendoEsta ? null : item.id);
                            }}
                            className="text-gray-500 hover:text-white p-1 rounded hover:bg-gray-700/50 transition cursor-pointer"
                            title="Escolher cor"
                          >
                            <Palette size={13} />
                          </button>
                        </div>
                      </div>

                      {/* POPUP SELETOR DE CORES */}
                      {escolhendoEsta && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute left-0 right-0 top-full mt-1.5 p-3 bg-[#111922] border border-gray-700 rounded-2xl shadow-2xl z-50 animate-in fade-in duration-150"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                              Escolha a cor da RPFO
                            </span>
                            <button
                              type="button"
                              onClick={() => setRpfoSelecionandoCor(null)}
                              className="text-gray-400 hover:text-white"
                            >
                              <X size={13} />
                            </button>
                          </div>
                          <div className="grid grid-cols-6 gap-2">
                            {PALETA_CORES.map((cor) => (
                              <button
                                key={cor.id}
                                type="button"
                                onClick={() => {
                                  setCoresCustomizadas((prev) => ({
                                    ...prev,
                                    [item.id]: cor,
                                    [item.brCompleta]: cor
                                  }));
                                  setRpfoSelecionandoCor(null);
                                }}
                                className={`w-6 h-6 rounded-lg ${cor.corBg} flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                                  item.hex === cor.hex ? 'ring-2 ring-white scale-105' : 'opacity-80 hover:opacity-100'
                                }`}
                                title={cor.nome}
                              >
                                {item.hex === cor.hex && <Check size={11} className="text-white" strokeWidth={3} />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filtroRpfoAtivo && (
                <button
                  type="button"
                  onClick={() => setFiltroRpfoAtivo(null)}
                  className="w-full mt-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Limpar Filtro (Mostrar Todas)
                </button>
              )}
            </div>

          </aside>

        </div>

        {/* MODAL CADASTRAR NOVA RPFO NO CALENDÁRIO */}
        

        {/* MODAL ADICIONAR NOVO ACONTECIMENTO */}
        {modalNovoEvento && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#5390f5]/20 text-[#5390f5] flex items-center justify-center">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Adicionar Acontecimento</h3>
                    <p className="text-[11px] text-gray-400">Novo registro para o dia {diaSelecionado} ({mesAtualObj.nome.split(' ')[0]})</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalNovoEvento(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarAcontecimento} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Título do Evento</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Vistoria Técnica Fiscal"
                    value={novoTitulo}
                    onChange={(e) => setNovoTitulo(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Vincular a Obra / Rodovia</label>
                  <select
                    value={novoRpfo}
                    onChange={(e) => setNovoRpfo(e.target.value)}
                    className="w-full px-3 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  >
                    {listaObrasSincronizadas.map((r) => (
                      <option key={r.id} value={r.id}>{r.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Processo SEI</label>
                  <input
                    type="text"
                    placeholder="Ex: 50605.001211/2026-76"
                    value={novoProcessoSei}
                    onChange={(e) => setNovoProcessoSei(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Descrição</label>
                  <textarea
                    rows="3"
                    placeholder="Detalhes ou anotações sobre o acontecimento..."
                    value={novoDescricao}
                    onChange={(e) => setNovoDescricao(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalNovoEvento(false)}
                    className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-xs font-semibold cursor-pointer transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#5390f5] hover:bg-[#437de0] text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-lg"
                  >
                    Salvar Acontecimento
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* MODAL EDITAR ACONTECIMENTO DO CALENDÁRIO */}
        {eventoEmEdicao && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#5390f5]/20 text-[#5390f5] flex items-center justify-center">
                    <Edit3 size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Editar Acontecimento</h3>
                    <p className="text-[11px] text-gray-400">Altere os dados do evento</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEventoEmEdicao(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarEdicaoAcontecimento} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Título do Evento</label>
                  <input
                    type="text"
                    required
                    value={eventoEmEdicao.titulo || ''}
                    onChange={(e) => setEventoEmEdicao({ ...eventoEmEdicao, titulo: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Dia do Mês</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    required
                    value={eventoEmEdicao.dia || 1}
                    onChange={(e) => setEventoEmEdicao({ ...eventoEmEdicao, dia: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Vincular a Obra / Rodovia</label>
                  <select
                    value={eventoEmEdicao.rpfoId || ''}
                    onChange={(e) => setEventoEmEdicao({ ...eventoEmEdicao, rpfoId: e.target.value })}
                    className="w-full px-3 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  >
                    {listaObrasSincronizadas.map((r) => (
                      <option key={r.id} value={r.id}>{r.nome}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Processo SEI</label>
                  <input
                    type="text"
                    value={eventoEmEdicao.processoSei || ''}
                    onChange={(e) => setEventoEmEdicao({ ...eventoEmEdicao, processoSei: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Descrição</label>
                  <textarea
                    rows="3"
                    value={eventoEmEdicao.descricao || ''}
                    onChange={(e) => setEventoEmEdicao({ ...eventoEmEdicao, descricao: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEventoEmEdicao(null)}
                    className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-xs font-semibold cursor-pointer transition"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#5390f5] hover:bg-[#437de0] text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-lg"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL EXCLUIR ACONTECIMENTO */}
        {eventoParaExcluir && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-red-700/60 w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl relative">
              <div className="w-12 h-12 rounded-2xl bg-red-900/40 border border-red-600/50 text-red-400 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Excluir Evento?</h3>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Tem certeza que deseja excluir o evento <strong className="text-white">"{eventoParaExcluir?.titulo || 'Selecionado'}"</strong>?
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEventoParaExcluir(null)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-semibold cursor-pointer transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmarExclusaoAcontecimento}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition cursor-pointer shadow-lg"
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL DETALHES POP-UP DO EVENTO */}
        {eventoPopUp && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#5390f5]/20 text-[#5390f5] border border-[#5390f5]/30">
                    {eventoPopUp.rpfoId}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{eventoPopUp.titulo}</h3>
                </div>
                <button
                  onClick={() => setEventoPopUp(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs text-gray-300 my-4 bg-[#15202b] p-4 rounded-2xl border border-gray-800">
                <p><strong>Data:</strong> Dia {eventoPopUp.dia} de {mesAtualObj.nome.split(' ')[0]} às {eventoPopUp.horario}</p>
                <p><strong>Processo SEI:</strong> <span className="font-mono text-[#5390f5]">{eventoPopUp.processoSei}</span></p>
                <div className="pt-2 border-t border-gray-800">
                  <p className="text-gray-400 leading-relaxed">{eventoPopUp.descricao}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEventoEmEdicao({ ...eventoPopUp });
                    setEventoPopUp(null);
                  }}
                  className="flex-1 py-2.5 bg-[#5390f5] hover:bg-[#437de0] text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
                >
                  <Edit3 size={14} /> Editar Este Evento
                </button>
                <button
                  onClick={() => setEventoPopUp(null)}
                  className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-xs font-semibold cursor-pointer transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL EDITAR LEGENDA (RODOVIA / REF) */}
        {itemRefEmEdicao && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-md rounded-3xl p-6 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
                <h3 className="text-base font-bold text-white">Editar Rodovia / REF</h3>
                <button onClick={() => setItemRefEmEdicao(null)} className="text-gray-400 hover:text-white"><X size={18} /></button>
              </div>
              <form onSubmit={salvarEdicaoRef} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Nome da Rodovia / Obra</label>
                  <input
                    type="text"
                    required
                    value={itemRefEmEdicao.nome}
                    onChange={(e) => setItemRefEmEdicao({ ...itemRefEmEdicao, nome: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Cor da Legenda</label>
                  <div className="grid grid-cols-5 gap-2">
                    {PALETA_CORES.slice(0, 10).map((cor) => (
                      <button
                        key={cor.id}
                        type="button"
                        onClick={() => setItemRefEmEdicao({ ...itemRefEmEdicao, corBg: cor.corBg, border: cor.border, hex: cor.hex })}
                        className={`h-8 rounded-xl ${cor.corBg} flex items-center justify-center transition cursor-pointer ${
                          itemRefEmEdicao.hex === cor.hex ? 'ring-2 ring-white scale-105' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {itemRefEmEdicao.hex === cor.hex && <Check size={14} className="text-white" strokeWidth={3} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setItemRefEmEdicao(null)} className="flex-1 py-2.5 bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold cursor-pointer">Cancelar</button>
                  <button type="submit" className="flex-1 py-2.5 bg-[#84cc16] text-black rounded-xl text-xs font-bold cursor-pointer">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL EXCLUIR LEGENDA (RODOVIA / REF) */}
        {itemRefParaExcluir && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
            <div className="bg-[#1c2936] border border-red-700/60 w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-red-900/40 border border-red-600/50 text-red-400 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Excluir Obra da Legenda?</h3>
              <p className="text-xs text-gray-400 mb-6">Confirma a exclusão de "{itemRefParaExcluir.nome}"?</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setItemRefParaExcluir(null)} className="flex-1 py-2 bg-gray-700 text-gray-300 rounded-xl text-xs font-semibold">Cancelar</button>
                <button type="button" onClick={confirmarExclusaoRef} className="flex-1 py-2 bg-red-600 text-white rounded-xl text-xs font-bold">Sim, Excluir</button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  // 4. ESPECIFICAÇÕES DETALHADAS DA RPFO COM EXPORTAÇÃO
  if (telaAtiva === 'especificacoes' && idRpfoEmEspecificacao) {
    const obra = listaRevisoes.find(r => r.id === idRpfoEmEspecificacao) || listaRevisoes[0];
    const piNum = converterMoedaParaNumero(obra.precoInicial);
    const pifNum = converterMoedaParaNumero(obra.precoFinal);
    const difNum = pifNum - piNum;
    const ehPositivo = difNum >= 0;

    return (
      <div className="min-h-screen bg-[#0b1219] text-white p-4 md:p-8 font-sans">
        
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-6 border-b border-gray-800/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setIdRpfoEmEspecificacao(null);
                setTelaAtiva('revisoes');
              }}
              className="text-gray-400 hover:text-white transition flex items-center gap-2 text-xs bg-[#16212e] px-4 py-2.5 rounded-xl border border-gray-700/60 cursor-pointer hover:border-gray-500"
            >
              <ChevronLeft size={16} /> Voltar para o Dashboard de RPFOs
            </button>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
              <span className="text-sm font-bold text-gray-300">| Especificações Detalhadas do Processo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* BOTÃO EXPORTAR TELA (PRINT / PDF / JPG) */}
            <div className="relative">
              <button
                type="button"
                disabled={exportando}
                onClick={() => setMenuExportarAberto(!menuExportarAberto)}
                className="bg-[#182635] hover:bg-[#22364a] border border-[#5390f5]/50 text-[#5390f5] py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg cursor-pointer"
              >
                <Download size={15} />
                <span>{exportando ? 'Gerando...' : 'Exportar Ficha'}</span>
                <ChevronDown size={13} />
              </button>

              {menuExportarAberto && (
                <div className="absolute right-0 mt-2 w-48 bg-[#182635] border border-gray-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => exportarTelaEspecificacoes('jpg', obra.br)}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition flex items-center gap-2 cursor-pointer"
                  >
                    <Download size={14} className="text-[#84cc16]" />
                    <span>Baixar como Imagem (JPG)</span>
                  </button>
                  <button
                    onClick={() => exportarTelaEspecificacoes('pdf', obra.br)}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition flex items-center gap-2 cursor-pointer"
                  >
                    <FileText size={14} className="text-[#5390f5]" />
                    <span>Baixar Relatório (PDF)</span>
                  </button>
                </div>
              )}
            </div>

            {podeEditar && (
              <button
                onClick={() => setRevisaoEmEdicao({ ...obra })}
                className="bg-[#84cc16] hover:bg-[#72b412] text-black py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg cursor-pointer"
              >
                <Edit3 size={15} /> Editar Dados Desta RPFO
              </button>
            )}
            
            <button
              onClick={fazerLogout}
              className="p-2 bg-[#16212e] hover:bg-red-950/40 border border-gray-700 rounded-xl text-gray-300 hover:text-red-400 transition cursor-pointer"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* CONTAINER DA FICHA DE ESPECIFICAÇÕES */}
        <div id="painel-especificacoes-exportar" className="max-w-7xl mx-auto space-y-6 p-2">
          
          <div className="bg-[#121c27] border border-gray-800/90 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
                  (obra.modalidade || 'Rodovia') === 'Rodovia' ? 'bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/40' :
                  (obra.modalidade || 'Rodovia') === 'Hidrovia' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {obra.modalidade || 'Rodovia'}
                </span>

                <div className="inline-block" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={obra.statusGeral || 'A Iniciar'}
                    onChange={(e) => alterarStatusGeralRPFO(obra.id, e.target.value)}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-[#182635] text-amber-300 border border-amber-400/40 cursor-pointer focus:outline-none"
                  >
                    <option value="A Iniciar">A Iniciar</option>
                    <option value="Elaborando">Elaborando</option>
                    <option value="Concluída">Concluída</option>
                    <option value="Em Análise">Em Análise</option>
                    <option value="Aprovada">Aprovada</option>
                  </select>
                </div>

                <span className="text-xs bg-amber-500/15 text-amber-300 font-semibold px-2.5 py-1 rounded-lg border border-amber-500/30">
                  RPFO 1ª Análise
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                {obra.br}
              </h1>
              <p className="text-base text-gray-400 mt-1 font-medium">
                {obra.tipoObra || 'RPFO - Restauração e Adequação'}
              </p>
            </div>

            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs text-gray-400 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-8">
              <div><strong className="text-gray-300">Contrato nº:</strong> <span className="font-mono text-white">{obra.contrato}</span></div>
              <div><strong className="text-gray-300">Processo SEI:</strong> <span className="font-mono text-[#5390f5]">{obra.processoSei}</span></div>
              <div><strong className="text-gray-300">Empresa Contratada:</strong> <span className="text-white font-semibold">{obra.contratada}</span></div>
            </div>
          </div>

          {/* RÉGUA DINÂMICA DE ETAPAS NA FICHA TÉCNICA */}
          <div className="bg-[#121c27] border border-gray-800/90 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block">
                Fluxo e Trâmite das Etapas ({obra.etapas.length} etapas)
              </span>
              <button
                type="button"
                onClick={() => adicionarEtapaRPFO(obra.id)}
                className="px-3 py-1 bg-[#84cc16]/20 hover:bg-[#84cc16] text-[#84cc16] hover:text-black rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} strokeWidth={3} /> Adicionar Etapa
              </button>
            </div>

            <div className="overflow-x-auto py-2">
              <div className="relative flex items-center justify-between min-w-[780px] px-4 gap-4">
                <div className="absolute left-8 right-8 top-[28px] h-[3px] bg-gray-700/80 -z-0" />

                {obra.etapas.map((etapa, idx) => {
                  const ehConcluido = etapa.status === 'concluido';

                  return (
                    <div key={idx} className="flex flex-col items-center text-center relative z-10 w-32 shrink-0 group/etapa">
                      {obra.etapas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removerEtapaRPFO(obra.id, idx)}
                          className="absolute -top-3 right-4 opacity-0 group-hover/etapa:opacity-100 bg-red-600/80 hover:bg-red-500 text-white rounded-full p-0.5 transition cursor-pointer z-20"
                          title="Remover esta etapa"
                        >
                          <X size={10} strokeWidth={3} />
                        </button>
                      )}

                      <div className="h-6 flex items-center justify-center mb-2">
                        {ehConcluido ? (
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="DD/MM/AAAA"
                            value={etapa.data && etapa.data !== 'Concluído' ? etapa.data : ''}
                            onChange={(e) => lidarComMudancaDataEtapa(obra.id, idx, e.target.value)}
                            className="w-24 text-[11px] font-mono text-center bg-[#111922] border border-[#84cc16]/60 rounded-md text-[#84cc16] font-bold py-0.5 focus:outline-none focus:ring-1 focus:ring-[#84cc16]"
                          />
                        ) : (
                          <span className={`text-[10px] font-mono font-medium truncate max-w-[110px] ${
                            etapa.status === 'andamento' ? 'text-amber-400 font-bold' :
                            etapa.status === 'nd' ? 'text-gray-200 font-bold' :
                            'text-gray-400'
                          }`}>
                            {etapa.data}
                          </span>
                        )}
                      </div>

                      <div
                        onClick={() => {
                          if (podeEditar) alternarStatusEtapa(obra.id, idx);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shadow-lg ${
                          podeEditar ? 'transition-all transform hover:scale-110 active:scale-95 cursor-pointer' : 'cursor-not-allowed opacity-90'
                        } ${
                          etapa.status === 'concluido'
                            ? 'bg-[#84cc16] text-black shadow-[#84cc16]/30'
                            : etapa.status === 'andamento'
                            ? 'bg-amber-400 text-black shadow-amber-400/30'
                            : etapa.status === 'nd'
                            ? 'bg-white text-gray-900 border-2 border-gray-300 shadow-white/20'
                            : 'bg-red-600 text-white shadow-red-600/30'
                        }`}
                        title={podeEditar ? "Clique para alternar o status" : "Acesso apenas para visualização"}
                      >
                        {etapa.status === 'concluido' ? (
                          <Check size={18} strokeWidth={3} />
                        ) : etapa.status === 'andamento' ? (
                          <Clock size={17} strokeWidth={3} />
                        ) : etapa.status === 'nd' ? (
                          <span className="text-[11px] font-extrabold tracking-tight">ND</span>
                        ) : (
                          <Clock size={17} />
                        )}
                      </div>

                      <input
                        type="text"
                        value={etapa.nome}
                        onChange={(e) => renomearEtapaRPFO(obra.id, idx, e.target.value)}
                        className="w-full text-center text-[11px] font-semibold text-gray-200 mt-2 leading-tight bg-transparent border border-transparent hover:border-gray-600 focus:border-[#5390f5] focus:bg-[#111922] rounded-md px-1 py-0.5 focus:outline-none transition"
                        title="Clique para editar o nome desta etapa"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MINI-SESSÃO EDITÁVEL DO GOOGLE DRIVE */}
            <div className="mt-5 pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#0d1620] p-3.5 rounded-2xl border border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#5390f5]/15 border border-[#5390f5]/30 text-[#5390f5] flex items-center justify-center font-bold text-sm">
                  📁
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
                    Pasta de Documentos Oficiais
                  </span>
                  <span className="text-xs font-bold text-white">Google Drive da Obra</span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto flex-1 sm:max-w-xl justify-end">
                <input
                  type="url"
                  placeholder="Cole aqui o link do Google Drive (https://drive.google.com/...)"
                  value={obra.linkDrive || ''}
                  onChange={(e) => atualizarLinkDrive(obra.id, e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#121c27] border border-gray-700 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5390f5]"
                />
                {obra.linkDrive ? (
                  <a
                    href={obra.linkDrive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#5390f5] hover:bg-[#437de0] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shrink-0 shadow-md"
                  >
                    <span>Abrir Drive</span>
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-500 px-2 shrink-0">Sem link</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Bloco 1: Mapa Completo do Brasil com Linhas Cartográficas */}
            <div className="lg:col-span-4 bg-[#0d171d] border border-gray-800/90 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#84cc16]">
                    Georreferenciamento DNIT
                  </span>
                  <span className="text-[10px] bg-white/10 px-2.5 py-0.5 rounded-full font-mono text-gray-300">
                    UF: {obra.uf || 'PA'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {obra.br.split(' - ')[0]}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Superintendência Regional do DNIT • Estado de {obra.uf || 'PA'}
                </p>
              </div>

              <div className="my-4 relative h-72 w-full bg-[#080e13] rounded-2xl border border-gray-800/80 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 500 500" className="w-full h-full p-2">
                  <defs>
                    <filter id="glow-pin-brasil" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#ffffff" floodOpacity="0.45" />
                    </filter>
                  </defs>

                  <path
                    d="M 175 42 L 230 46 L 275 62 L 305 75 L 340 105 L 380 125 L 435 155 L 460 178 L 440 215 L 405 240 L 390 275 L 375 325 L 340 360 L 320 405 L 295 450 L 265 465 L 255 425 L 270 380 L 255 350 L 220 330 L 195 285 L 180 230 L 125 210 L 75 190 L 50 150 L 95 120 L 135 75 Z"
                    fill="#111c24"
                    stroke="#233542"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />

                  <g fill="none" stroke="#1d2e3b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 135 75 L 175 110 L 220 100 L 265 115" />
                    <path d="M 175 110 L 165 170 L 125 185 L 75 190" />
                    <path d="M 220 100 L 235 175 L 295 170 L 335 125" />
                    <path d="M 235 175 L 255 240 L 290 235 L 295 170" />
                    
                    <path d="M 335 125 L 380 125 L 425 145 L 445 175" />
                    <path d="M 380 125 L 380 185 L 440 215" />
                    <path d="M 380 185 L 345 220 L 385 265 L 395 240" />
                    <path d="M 295 170 L 345 220" />

                    <path d="M 165 170 L 235 175 L 235 250 L 180 230" />
                    <path d="M 235 250 L 295 245 L 305 295 L 255 310 L 235 250" />
                    <circle cx="282" cy="254" r="2.5" fill="#84cc16" opacity="0.8" />

                    <path d="M 295 245 L 345 220 L 375 270 L 325 305 Z" />
                    <path d="M 325 305 L 375 325 L 340 345 L 295 330 Z" />
                    <path d="M 255 310 L 295 330 L 285 365 L 245 340 Z" />

                    <path d="M 245 340 L 285 365 L 275 395 L 235 375 Z" />
                    <path d="M 235 375 L 275 395 L 265 425 L 225 405 Z" />
                    <path d="M 225 405 L 265 425 L 255 460 L 210 435 Z" />
                  </g>

                  <circle cx="150" cy="130" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="285" cy="115" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="435" cy="165" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="450" cy="180" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="430" cy="210" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="275" cy="252" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="215" cy="245" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="345" cy="305" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="320" cy="335" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="355" cy="330" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="270" cy="370" r="2.5" fill="#ffffff" opacity="0.45" />
                  <circle cx="250" cy="430" r="2.5" fill="#ffffff" opacity="0.45" />

                  {(() => {
                    const coordenadasUF = {
                      PA: { cx: 275, cy: 135 },
                      BA: { cx: 395, cy: 230 },
                      DF: { cx: 282, cy: 254 },
                      RN: { cx: 448, cy: 175 },
                      AL: { cx: 435, cy: 202 },
                      RS: { cx: 248, cy: 428 },
                    };
                    const pos = coordenadasUF[obra.uf] || { cx: 275, cy: 135 };

                    return (
                      <g className="transition-all duration-700 ease-out">
                        <circle cx={pos.cx} cy={pos.cy + 18} r="16" fill="#84cc16" opacity="0.22" className="animate-ping" />
                        <circle cx={pos.cx} cy={pos.cy + 18} r="5" fill="#84cc16" />

                        <g transform={`translate(${pos.cx - 16}, ${pos.cy - 18})`} filter="url(#glow-pin-brasil)">
                          <path
                            d="M 16 0 C 7.16 0 0 7.16 0 16 C 0 25.5 16 38 16 38 C 16 38 32 25.5 32 16 C 32 7.16 24.84 0 16 0 Z"
                            fill="#ffffff"
                          />
                          <text 
                            x="16" 
                            y="19" 
                            fill="#000000" 
                            fontSize="9" 
                            fontWeight="900" 
                            textAnchor="middle" 
                            fontFamily="ui-monospace, monospace"
                          >
                            {obra.uf || 'BR'}
                          </text>
                        </g>
                      </g>
                    );
                  })()}
                </svg>

                <div className="absolute bottom-2.5 left-3 text-[9px] font-mono text-gray-500">
                  Cartografia Brasil • Escala 1:5000000
                </div>
                <div className="absolute top-2.5 right-3 text-[9px] font-mono text-[#84cc16] flex items-center gap-1.5 bg-[#121c27]/80 px-2.5 py-1 rounded-full border border-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16] animate-pulse" />
                  Obra Georreferenciada
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800 flex justify-between items-center text-xs text-gray-400">
                <span>Trecho em Acompanhamento</span>
                <span className="font-mono text-white font-bold">{obra.br}</span>
              </div>
            </div>

            {/* Bloco 2: Itens Adequados com Subitens Hierárquicos */}
            <div className="lg:col-span-4 bg-[#121c27] border border-gray-800/90 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-2">
                  Composição de Itens
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <Layers size={18} className="text-[#5390f5]" /> Itens Adequados no Processo
                </h3>

                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {(obra.itensAdequados || []).map((item, idx) => {
                    const tituloItem = typeof item === 'string' ? item : item.titulo;
                    const subitens = typeof item === 'object' && Array.isArray(item.subitens) ? item.subitens : [];
                    const inserindoSubAqui = itemIndexAdicionandoSub === idx;

                    return (
                      <div key={idx} className="bg-[#182635] rounded-xl border border-gray-700/60 overflow-hidden shadow-xs">
                        {/* Tópico Principal */}
                        <div className="flex items-center justify-between p-3 text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2 h-2 rounded-full bg-[#84cc16] shrink-0" />
                            <span className="font-bold text-gray-100 truncate">{tituloItem}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Botão de adicionar subitem (apenas ícone) */}
                            <button
                              type="button"
                              onClick={() => {
                                setItemIndexAdicionandoSub(inserindoSubAqui ? null : idx);
                                setNovoSubitemTexto('');
                              }}
                              className={`p-1 rounded-md transition cursor-pointer flex items-center justify-center ${
                                inserindoSubAqui 
                                  ? 'bg-[#5390f5] text-white' 
                                  : 'text-gray-400 hover:text-white bg-[#121c27] hover:bg-gray-700/60 border border-gray-700/50'
                              }`}
                              title="Adicionar subitem"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>

                            {/* Botão de remover o tópico */}
                            <button
                              type="button"
                              onClick={() => removerItemAdequado(obra.id, idx)}
                              className="text-gray-500 hover:text-red-400 p-1 rounded transition cursor-pointer"
                              title="Remover tópico"
                            >
                              <X size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Campo dinâmico para digitar o subitem */}
                        {inserindoSubAqui && (
                          <div className="px-3 pb-2.5 pt-1 bg-[#121c27]/60 border-t border-gray-700/40 flex gap-2 animate-in fade-in">
                            <input
                              type="text"
                              autoFocus
                              placeholder="Nome do subitem..."
                              value={novoSubitemTexto}
                              onChange={(e) => setNovoSubitemTexto(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  adicionarSubitemAdequado(obra.id, idx);
                                } else if (e.key === 'Escape') {
                                  setItemIndexAdicionandoSub(null);
                                }
                              }}
                              className="flex-1 px-2.5 py-1.5 bg-[#182635] border border-[#5390f5]/50 rounded-lg text-[11px] text-white focus:outline-none focus:border-[#5390f5]"
                            />
                            <button
                              type="button"
                              onClick={() => adicionarSubitemAdequado(obra.id, idx)}
                              className="px-2.5 py-1.5 bg-[#5390f5] hover:bg-[#437de0] text-white text-[11px] font-bold rounded-lg transition cursor-pointer"
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemIndexAdicionandoSub(null)}
                              className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 text-[11px] rounded-lg transition cursor-pointer"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        )}

                        {/* Lista visual dos subitens */}
                        {subitens.length > 0 && (
                          <div className="bg-[#121c27]/40 border-t border-gray-800/80 px-3 py-2 space-y-1.5">
                            {subitens.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className="flex items-center justify-between pl-3 pr-1 py-1 rounded-md bg-[#162230]/70 border border-gray-700/30 text-[11px] text-gray-300"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#5390f5] shrink-0 opacity-80" />
                                  <span className="truncate">{sub}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removerSubitemAdequado(obra.id, idx, sIdx)}
                                  className="text-gray-500 hover:text-red-400 p-0.5 rounded transition cursor-pointer"
                                  title="Remover este subitem"
                                >
                                  <X size={11} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Adicionar novo tópico principal..."
                    value={novoItemAdequadoTexto}
                    onChange={(e) => setNovoItemAdequadoTexto(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        adicionarItemAdequado(obra.id);
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-[#111922] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#5390f5]"
                  />
                  <button
                    onClick={() => adicionarItemAdequado(obra.id)}
                    className="px-3 py-2 bg-[#5390f5] hover:bg-[#437de0] text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1"
                  >
                    <Plus size={14} /> Adicionar
                  </button>
                </div>
              </div>
            </div>

            {/* Bloco 3: Evolução Contratual e Infográficos com Teto de 25% para Acréscimos e Decréscimos */}
            <div className="lg:col-span-4 bg-[#121c27] border border-gray-800/90 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-2">
                  Demonstrativo Orçamentário
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <BarChart3 size={18} className="text-[#84cc16]" /> Evolução Contratual
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between bg-[#182635] p-2.5 rounded-2xl border border-gray-700/60 text-xs">
                    <span className="text-gray-400 font-semibold">Preço Inicial (PI)</span>
                    <span className="font-bold text-white font-mono text-sm">R$ {obra.precoInicial}</span>
                  </div>

                  {(() => {
                    const valorAcrescNum = obra.acrescimo !== undefined 
                      ? converterMoedaParaNumero(obra.acrescimo) 
                      : (ehPositivo ? Math.abs(difNum) : 0);

                    const valorDecrescNum = obra.decrescimo !== undefined 
                      ? converterMoedaParaNumero(obra.decrescimo) 
                      : (!ehPositivo ? Math.abs(difNum) : 0);

                    const percAcresc = piNum > 0 ? (valorAcrescNum / piNum) * 100 : 0;
                    const percDecresc = piNum > 0 ? (valorDecrescNum / piNum) * 100 : 0;

                    const consumoAcresc25 = Math.min((percAcresc / 25) * 100, 100);
                    const consumoDecresc25 = Math.min((percDecresc / 25) * 100, 100);

                    const estourouAcresc = percAcresc > 25;
                    const estourouDecresc = percDecresc > 25;
                    const tetoMaximo25 = piNum * 0.25;

                    return (
                      <>
                        <div className="grid grid-cols-2 gap-2">
                          {/* Card Acréscimo (+) */}
                          <div className="bg-[#182635] p-2.5 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-wide">Acréscimo (+)</span>
                              <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 shrink-0">
                                +{percAcresc.toFixed(2).replace('.', ',')}%
                              </span>
                            </div>
                            <span className="font-extrabold text-emerald-300 font-mono text-xs whitespace-nowrap leading-tight">
                              R$ {formatarNumeroParaMoeda(valorAcrescNum)}
                            </span>
                          </div>

                          {/* Card Supressão (-) */}
                          <div className="bg-[#182635] p-2.5 rounded-2xl border border-rose-500/30 flex flex-col justify-between">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="text-rose-400 font-bold text-[10px] uppercase tracking-wide">Supressão (-)</span>
                              <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 shrink-0">
                                -{percDecresc.toFixed(2).replace('.', ',')}%
                              </span>
                            </div>
                            <span className="font-extrabold text-rose-300 font-mono text-xs whitespace-nowrap leading-tight">
                              R$ {formatarNumeroParaMoeda(valorDecrescNum)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-[#182635] p-2.5 rounded-2xl border border-gray-700/60 text-xs">
                          <span className="text-[#84cc16] font-bold">PI + RPFO Final</span>
                          <span className="font-extrabold text-[#84cc16] font-mono text-sm">R$ {obra.precoFinal}</span>
                        </div>

                        <div className={`flex items-center justify-between p-3 rounded-2xl border ${
                          ehPositivo ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/25 border-rose-500/40 text-rose-300'
                        }`}>
                          <div className="flex items-center gap-1.5 font-bold text-xs">
                            {ehPositivo ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            <span>Variação Líquida</span>
                          </div>
                          <div className="text-right font-mono">
                            <div className="font-extrabold text-sm">R$ {obra.acumulado}</div>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-black/40 inline-block mt-0.5">
                              {obra.percentual}
                            </span>
                          </div>
                        </div>

                        {/* LIMITES LEGAIS INDIVIDUAIS DE 25% (ACRÉSCIMO E DECRÉSCIMO) */}
                        <div className="bg-[#0a1118] p-3.5 rounded-2xl border border-gray-800 space-y-3 mb-4">
                          <div className="flex justify-between items-center text-[11px] font-extrabold text-gray-300 uppercase tracking-wide border-b border-gray-800 pb-1.5">
                            <span>Limites Legais (Teto 25% do PI)</span>
                            <span className="font-mono text-gray-400 text-[10px]">Teto: R$ {formatarNumeroParaMoeda(tetoMaximo25)}</span>
                          </div>

                          {/* Barra 1: Acréscimos (Teto 25%) */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
                                <span className={`w-2 h-2 rounded-full ${estourouAcresc ? 'bg-red-500 animate-ping' : 'bg-emerald-400'}`} />
                                Acréscimos Consumidos
                              </span>
                              <span className={`font-mono text-xs font-bold ${estourouAcresc ? 'text-red-400' : 'text-emerald-300'}`}>
                                {percAcresc.toFixed(2).replace('.', ',')}% / 25,00%
                              </span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-700/80">
                              <div
                                style={{ width: `${consumoAcresc25}%` }}
                                className={`h-full rounded-full transition-all duration-700 ${
                                  estourouAcresc ? 'bg-red-500' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                                }`}
                              />
                            </div>
                          </div>

                          {/* Barra 2: Decréscimos / Supressões (Teto 25%) */}
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span className="text-rose-400 font-bold flex items-center gap-1.5 text-[11px]">
                                <span className={`w-2 h-2 rounded-full ${estourouDecresc ? 'bg-red-500 animate-ping' : 'bg-rose-400'}`} />
                                Supressões Consumidas
                              </span>
                              <span className={`font-mono text-xs font-bold ${estourouDecresc ? 'text-red-400' : 'text-rose-300'}`}>
                                {percDecresc.toFixed(2).replace('.', ',')}% / 25,00%
                              </span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-800 rounded-full overflow-hidden p-0.5 border border-gray-700/80">
                              <div
                                style={{ width: `${consumoDecresc25}%` }}
                                className={`h-full rounded-full transition-all duration-700 ${
                                  estourouDecresc ? 'bg-red-500' : 'bg-gradient-to-r from-rose-600 to-rose-400'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <button
                onClick={() => setRevisaoEmEdicao({ ...obra })}
                className="w-full mt-2 py-2.5 bg-[#182635] hover:bg-[#203347] border border-gray-700 text-gray-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Edit3 size={14} /> Editar Valores desta Obra
              </button>
            </div>

          </div>

        </div>

        {/* MODAL EDITAR RPFO DENTRO DAS ESPECIFICAÇÕES */}
        {revisaoEmEdicao && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center">
                    <Edit3 size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Editar Valores da RPFO</h3>
                    <p className="text-xs text-gray-400">{revisaoEmEdicao.br}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRevisaoEmEdicao(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarEdicaoRevisao} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Tipo de Modal / Obra
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-[#15202b] rounded-xl border border-gray-700">
                    {[
                      { id: 'Rodovia', label: 'Rodovia' },
                      { id: 'Hidrovia', label: 'Hidrovia' },
                      { id: 'Ferrovia', label: 'Ferrovia' }
                    ].map((mod) => {
                      const ativa = (revisaoEmEdicao.modalidade || 'Rodovia') === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setRevisaoEmEdicao({ ...revisaoEmEdicao, modalidade: mod.id })}
                          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            ativa
                              ? mod.id === 'Rodovia' ? 'bg-[#84cc16] text-black shadow-md'
                              : mod.id === 'Hidrovia' ? 'bg-cyan-500 text-black shadow-md'
                              : 'bg-amber-500 text-black shadow-md'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                          }`}
                        >
                          {ativa && <Check size={12} strokeWidth={3} />}
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Identificação da Obra / Trecho</label>
                  <input
                    type="text"
                    required
                    value={revisaoEmEdicao.br}
                    onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, br: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Preço Inicial (PI)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 481.714.777,66"
                      value={revisaoEmEdicao.precoInicial}
                      onChange={(e) => setRevisaoEmEdicao(recalcularCamposRPFO(revisaoEmEdicao, 'precoInicial', e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1.5">Acréscimo R$ (+)</label>
                    <input
                      type="text"
                      placeholder="Ex: 10.000.000,00"
                      value={revisaoEmEdicao.acrescimo || ''}
                      onChange={(e) => setRevisaoEmEdicao(recalcularCamposRPFO(revisaoEmEdicao, 'acrescimo', e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-emerald-500/40 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-rose-400 mb-1.5">Decréscimo R$ (-)</label>
                    <input
                      type="text"
                      placeholder="Ex: 5.000.000,00"
                      value={revisaoEmEdicao.decrescimo || ''}
                      onChange={(e) => setRevisaoEmEdicao(recalcularCamposRPFO(revisaoEmEdicao, 'decrescimo', e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-rose-500/40 rounded-xl text-sm text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Valor Acumulado (Automático)</label>
                    <input
                      type="text"
                      readOnly
                      tabIndex="-1"
                      value={revisaoEmEdicao.acumulado || 'R$ 0,00'}
                      className={`w-full px-3.5 py-2.5 bg-[#111922] rounded-xl text-sm font-bold font-mono cursor-not-allowed select-none transition border ${
                        revisaoEmEdicao.ehPositivo 
                          ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' 
                          : 'text-rose-400 border-rose-500/40 bg-rose-950/20'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Percentual (Automático)</label>
                    <input
                      type="text"
                      readOnly
                      tabIndex="-1"
                      value={revisaoEmEdicao.percentual || '0,00%'}
                      className={`w-full px-3.5 py-2.5 bg-[#111922] rounded-xl text-sm font-bold font-mono cursor-not-allowed select-none transition border ${
                        revisaoEmEdicao.ehPositivo 
                          ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' 
                          : 'text-rose-400 border-rose-500/40 bg-rose-950/20'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Status Geral</label>
                    <select
                      value={revisaoEmEdicao.statusGeral || 'A Iniciar'}
                      onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, statusGeral: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#84cc16]"
                    >
                      <option value="A Iniciar">A Iniciar</option>
                      <option value="Em Execução">Em Execução</option>
                      <option value="Concluída">Concluída</option>
                      <option value="Em Análise">Em Análise</option>
                      <option value="Aprovada">Aprovada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Contrato nº</label>
                    <input
                      type="text"
                      value={revisaoEmEdicao.contrato || ''}
                      onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, contrato: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Processo SEI</label>
                    <input
                      type="text"
                      value={revisaoEmEdicao.processoSei || ''}
                      onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, processoSei: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Link do Google Drive</label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={revisaoEmEdicao.linkDrive || ''}
                      onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, linkDrive: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#5390f5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Vínculo Especial</label>
                    <button
                      type="button"
                      onClick={() => {
                        const tem = revisaoEmEdicao.observacao && revisaoEmEdicao.observacao.includes('CGU');
                        setRevisaoEmEdicao({
                          ...revisaoEmEdicao,
                          observacao: tem ? '' : 'Atendendo a solicitação da CGU'
                        });
                      }}
                      className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                        revisaoEmEdicao.observacao && revisaoEmEdicao.observacao.includes('CGU')
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-sm'
                          : 'bg-[#15202b] border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      <Check size={14} className={revisaoEmEdicao.observacao && revisaoEmEdicao.observacao.includes('CGU') ? 'opacity-100' : 'opacity-0'} />
                      <span>{revisaoEmEdicao.observacao && revisaoEmEdicao.observacao.includes('CGU') ? 'Possui Vínculo com a CGU' : 'Sem Vínculo com a CGU'}</span>
                    </button>
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRevisaoEmEdicao(null)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-700/60 hover:bg-gray-700 text-gray-300 text-sm font-medium transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#72b412] text-black text-sm font-bold transition shadow cursor-pointer"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  // 5. DASHBOARD PRINCIPAL DE REVISÕES
  if (telaAtiva === 'revisoes') {
    
    const parseMoeda = (val) => {
      if (!val) return 0;
      const num = parseFloat(val.toString().replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
      return isNaN(num) ? 0 : num;
    };

    const formatarBRL = (val) => {
      return val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const revisoesParaIndicadores = rpfosSelecionadasDashIds.length > 0
      ? listaRevisoes.filter(r => rpfosSelecionadasDashIds.includes(r.id))
      : listaRevisoes;

    const qtdHidrovia = revisoesParaIndicadores.filter(r => (r.modalidade || (r.br.toLowerCase().includes('hidro') ? 'Hidrovia' : 'Rodovia')) === 'Hidrovia').length;
    const qtdFerrovia = revisoesParaIndicadores.filter(r => (r.modalidade || (r.br.toLowerCase().includes('ferro') ? 'Ferrovia' : 'Rodovia')) === 'Ferrovia').length;
    const qtdRodovia = revisoesParaIndicadores.filter(r => (r.modalidade || 'Rodovia') === 'Rodovia').length;
    const qtdTotalObras = revisoesParaIndicadores.length;

    const somaPI = revisoesParaIndicadores.reduce((acc, r) => acc + parseMoeda(r.precoInicial), 0);
    const somaPIMaisRPFO = revisoesParaIndicadores.reduce((acc, r) => acc + parseMoeda(r.precoFinal), 0);
    const somaApenasRPFO = somaPIMaisRPFO - somaPI;

    let countAIniciar = 0;
    let countElaborando = 0;
    let countConcluida = 0;
    let countEmAnalise = 0;
    let countAprovada = 0;

    revisoesParaIndicadores.forEach((rev) => {
      const st = rev.statusGeral || 'A Iniciar';
      if (st === 'Aprovada') countAprovada++;
      else if (st === 'Em Análise') countEmAnalise++;
      else if (st === 'Concluída') countConcluida++;
      else if (st === 'Em Execução' || st === 'Elaborando') countElaborando++;
      else countAIniciar++;
    });

    const todasEstaoSelecionadas = rpfosSelecionadasDashIds.length === listaRevisoes.length && listaRevisoes.length > 0;

    return (
      <div className="min-h-screen bg-[#0d141c] text-white p-4 md:p-8 font-sans">
        
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-8 border-b border-gray-800/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTelaAtiva('hub')}
              className="text-gray-400 hover:text-white transition flex items-center gap-1.5 text-xs bg-[#16212e] px-3.5 py-2 rounded-xl border border-gray-700/60 cursor-pointer"
            >
              <ChevronLeft size={16} /> Voltar ao Início
            </button>
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
              <span className="text-sm font-bold text-gray-300">| Painel Executivo de RPFOs</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {podeEditar && (
              <button
                type="button"
                onClick={() => setModalNovaRevisao(true)}
                className="bg-[#84cc16] hover:bg-[#72b412] text-black py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg shadow-[#84cc16]/10 cursor-pointer"
              >
                <Plus size={16} />
                + Nova Revisão (RPFO)
              </button>
            )}
            <button
              onClick={fazerLogout}
              className="p-2 bg-[#16212e] hover:bg-red-950/40 border border-gray-700 rounded-xl text-gray-300 hover:text-red-400 transition cursor-pointer"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto space-y-8">
          
          {rpfosSelecionadasDashIds.length > 0 && (
            <div className="bg-[#182635] border border-[#84cc16]/50 rounded-2xl p-3 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] animate-pulse" />
                <span className="text-xs text-gray-300">
                  Somando dados de <strong className="text-white font-mono text-sm">{rpfosSelecionadasDashIds.length}</strong> {rpfosSelecionadasDashIds.length === 1 ? 'obra selecionada' : 'obras selecionadas'}:{' '}
                  <span className="text-[#84cc16] font-semibold">
                    {listaRevisoes
                      .filter(r => rpfosSelecionadasDashIds.includes(r.id))
                      .map(r => r.br.split(' - ')[0])
                      .join(', ')}
                  </span>
                </span>
              </div>
              <button
                onClick={deselecionarTodasRPFOs}
                className="text-xs bg-[#111922] hover:bg-gray-800 text-gray-300 hover:text-white px-3 py-1.5 rounded-xl border border-gray-700 transition cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <X size={12} /> Desmarcar Todas
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            <div className="bg-[#16212e] border border-gray-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Obras Acompanhadas</span>
                <div className="w-7 h-7 rounded-lg bg-[#5390f5]/15 text-[#5390f5] flex items-center justify-center">
                  <Activity size={15} />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-800 text-center">
                <div className="bg-[#111922] p-2 rounded-xl border border-gray-800/80">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">Rodovia</span>
                  <span className="text-lg font-bold text-white font-mono">{qtdRodovia}</span>
                </div>
                <div className="bg-[#111922] p-2 rounded-xl border border-gray-800/80">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">Hidrovia</span>
                  <span className="text-lg font-bold text-cyan-400 font-mono">{qtdHidrovia}</span>
                </div>
                <div className="bg-[#111922] p-2 rounded-xl border border-gray-800/80">
                  <span className="text-[10px] uppercase font-semibold text-gray-400 block">Ferrovia</span>
                  <span className="text-lg font-bold text-amber-400 font-mono">{qtdFerrovia}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 text-xs">
                <span className="text-gray-400 font-medium">Total de Obras</span>
                <span className="text-xl font-extrabold text-[#84cc16] font-mono">{qtdTotalObras}</span>
              </div>
            </div>

            <div className="bg-[#16212e] border border-gray-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Orçamentos Consolidados</span>
                <div className="w-7 h-7 rounded-lg bg-[#84cc16]/15 text-[#84cc16] flex items-center justify-center">
                  <DollarSign size={15} />
                </div>
              </div>

              <div className="space-y-2 py-1">
                <div className="flex justify-between items-center bg-[#111922] p-2 px-3 rounded-xl border border-gray-800/80 text-xs">
                  <span className="text-gray-400 font-medium">Orçamento PI Contratos:</span>
                  <span className="font-bold text-gray-200 font-mono">R$ {formatarBRL(somaPI)}</span>
                </div>
                <div className="flex justify-between items-center bg-[#111922] p-2 px-3 rounded-xl border border-gray-800/80 text-xs">
                  <span className="text-gray-400 font-medium">Orçamento PI + RPFO:</span>
                  <span className="font-bold text-white font-mono">R$ {formatarBRL(somaPIMaisRPFO)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-800 text-xs">
                <span className="text-gray-400 font-medium">Soma Saldo das RPFOs:</span>
                <span className={`text-base font-extrabold font-mono ${somaApenasRPFO >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {somaApenasRPFO >= 0 ? '+ R$ ' : '- R$ '}{formatarBRL(Math.abs(somaApenasRPFO))}
                </span>
              </div>
            </div>

            <div className="bg-[#16212e] border border-gray-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status das Etapas</span>
                <div className="w-7 h-7 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center">
                  <Clock size={15} />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-1.5 text-center py-1.5">
                <div className="bg-[#111922] px-1 py-2 rounded-xl border border-gray-800 flex flex-col justify-between items-center min-h-[64px]">
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-gray-400 tracking-tight whitespace-nowrap block w-full truncate">
                    A Iniciar
                  </span>
                  <span className="text-base font-extrabold text-gray-300 font-mono leading-none">
                    {countAIniciar}
                  </span>
                </div>

                <div className="bg-[#111922] px-1 py-2 rounded-xl border border-gray-800 flex flex-col justify-between items-center min-h-[64px]">
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-blue-400 tracking-tight whitespace-nowrap block w-full truncate">
                    Em Execução
                  </span>
                  <span className="text-base font-extrabold text-blue-400 font-mono leading-none">
                    {countElaborando}
                  </span>
                </div>

                <div className="bg-[#111922] px-1 py-2 rounded-xl border border-gray-800 flex flex-col justify-between items-center min-h-[64px]">
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-purple-400 tracking-tight whitespace-nowrap block w-full truncate">
                    Concluída
                  </span>
                  <span className="text-base font-extrabold text-purple-400 font-mono leading-none">
                    {countConcluida}
                  </span>
                </div>

                <div className="bg-[#111922] px-1 py-2 rounded-xl border border-amber-500/30 flex flex-col justify-between items-center min-h-[64px]">
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-amber-400 tracking-tight whitespace-nowrap block w-full truncate">
                    Em Análise
                  </span>
                  <span className="text-base font-extrabold text-amber-400 font-mono leading-none">
                    {countEmAnalise}
                  </span>
                </div>

                <div className="bg-[#111922] px-1 py-2 rounded-xl border border-gray-800 flex flex-col justify-between items-center min-h-[64px]">
                  <span className="text-[8px] sm:text-[9px] uppercase font-bold text-emerald-400 tracking-tight whitespace-nowrap block w-full truncate">
                    Aprovada
                  </span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono leading-none">
                    {countAprovada}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-gray-500 text-right">
                {rpfosSelecionadasDashIds.length > 0 ? 'Status das obras selecionadas' : 'Total acumulado no trâmite'}
              </div>
            </div>

          </div>

          <div className="bg-[#131c26] rounded-3xl border border-gray-800/80 p-6 shadow-2xl">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-800 gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Portfólio de RPFOs Rodoviárias</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Selecione as obras para somar no topo. Limite de até <strong>2 abertas</strong> simultaneamente para consulta técnica.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={selecionarTodasRPFOs}
                  disabled={todasEstaoSelecionadas}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                    todasEstaoSelecionadas
                      ? 'opacity-40 cursor-not-allowed bg-transparent border-gray-700 text-gray-500'
                      : 'bg-[#182635] border-[#84cc16]/50 text-[#84cc16] hover:bg-[#84cc16] hover:text-black'
                  }`}
                >
                  <CheckSquare size={14} /> Selecionar Todas
                </button>
                <button
                  onClick={deselecionarTodasRPFOs}
                  disabled={rpfosSelecionadasDashIds.length === 0}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition cursor-pointer ${
                    rpfosSelecionadasDashIds.length === 0
                      ? 'opacity-40 cursor-not-allowed bg-transparent border-gray-700 text-gray-500'
                      : 'bg-[#182635] border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Square size={14} /> Desmarcar Todas
                </button>
              </div>
            </div>

            {/* BARRA DE FILTROS: MODAL (RODOVIAS, FERROVIAS, HIDROVIAS) E EMPRESAS */}
            <div className="mb-6 p-4 rounded-2xl bg-[#16212e] border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide mr-1">Modal:</span>
                {[
                  { id: 'Todos', label: 'Todos' },
                  { id: 'Rodovia', label: 'Rodovias' },
                  { id: 'Hidrovia', label: 'Hidrovias' },
                  { id: 'Ferrovia', label: 'Ferrovias' }
                ].map((m) => {
                  const ativo = filtroModalidadeDash === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFiltroModalidadeDash(m.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        ativo
                          ? m.id === 'Rodovia' ? 'bg-[#84cc16] text-black shadow-md'
                          : m.id === 'Hidrovia' ? 'bg-cyan-500 text-black shadow-md'
                          : m.id === 'Ferrovia' ? 'bg-amber-500 text-black shadow-md'
                          : 'bg-[#5390f5] text-white shadow-md'
                          : 'bg-[#121c27] text-gray-400 hover:text-white border border-gray-700/60'
                      }`}
                    >
                      {m.label}
                    </button>
                  );
                })}
              </div>

              {/* FILTRO DE EMPRESAS CONTRATADAS */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide shrink-0">Empresa:</span>
                <select
                  value={filtroEmpresaDash}
                  onChange={(e) => setFiltroEmpresaDash(e.target.value)}
                  className="bg-[#121c27] border border-gray-700 rounded-xl px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:border-[#5390f5] cursor-pointer"
                >
                  <option value="Todas">Todas as Empresas</option>
                  {Array.from(new Set(listaRevisoes.map((r) => r.contratada).filter(Boolean))).map((emp) => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>

                {(filtroModalidadeDash !== 'Todos' || filtroEmpresaDash !== 'Todas') && (
                  <button
                    type="button"
                    onClick={() => {
                      setFiltroModalidadeDash('Todos');
                      setFiltroEmpresaDash('Todas');
                    }}
                    className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition cursor-pointer"
                    title="Limpar Filtros"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {listaRevisoes
                .filter((rev) => {
                  const mod = rev.modalidade || (rev.br.toLowerCase().includes('hidro') ? 'Hidrovia' : rev.br.toLowerCase().includes('ferro') ? 'Ferrovia' : 'Rodovia');
                  const matchModal = filtroModalidadeDash === 'Todos' || mod === filtroModalidadeDash;
                  const matchEmpresa = filtroEmpresaDash === 'Todas' || rev.contratada === filtroEmpresaDash;
                  return matchModal && matchEmpresa;
                })
                .map((rev) => {
                const estaAberto = cardsExpandidosIds.includes(rev.id);
                const estaSelecionado = rpfosSelecionadasDashIds.includes(rev.id);

                return (
                  <div
                    key={rev.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      estaSelecionado
                        ? 'bg-[#182433] border-[#84cc16] shadow-xl shadow-[#84cc16]/10 ring-1 ring-[#84cc16]'
                        : estaAberto
                        ? 'bg-[#182433] border-gray-600'
                        : 'bg-[#16212e] border-gray-800 hover:border-gray-700 hover:bg-[#1a2736]'
                    }`}
                  >
                    <div
                      onClick={() => alternarExpansaoCard(rev.id)}
                      className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="lg:w-1/3 flex items-start gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            alternarSelecaoRPFO(rev.id);
                          }}
                          className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition border cursor-pointer shrink-0 ${
                            estaSelecionado
                              ? 'bg-[#84cc16] border-[#84cc16] text-black shadow-sm'
                              : 'bg-[#121c26] border-gray-600 hover:border-[#84cc16] text-transparent'
                          }`}
                          title={estaSelecionado ? "Desmarcar para não somar no topo" : "Marcar para somar no topo"}
                        >
                          <Check size={13} strokeWidth={3.5} className={estaSelecionado ? 'opacity-100' : 'opacity-0'} />
                        </button>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <h4 className="text-base font-bold text-white tracking-tight">{rev.br}</h4>
                            
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              (rev.modalidade || 'Rodovia') === 'Rodovia' ? 'bg-[#84cc16]/15 text-[#84cc16] border border-[#84cc16]/30' :
                              (rev.modalidade || 'Rodovia') === 'Hidrovia' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                              'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            }`}>
                              {rev.modalidade || 'Rodovia'}
                            </span>

                            <div onClick={(e) => e.stopPropagation()} className="relative inline-block">
                              <select
                                value={rev.statusGeral || 'A Iniciar'}
                                onChange={(e) => alterarStatusGeralRPFO(rev.id, e.target.value)}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border cursor-pointer focus:outline-none transition ${
                                  (rev.statusGeral || 'A Iniciar') === 'Aprovada' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                                  (rev.statusGeral || 'A Iniciar') === 'Em Análise' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                                  (rev.statusGeral || 'A Iniciar') === 'Concluída' ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' :
                                  (rev.statusGeral || 'A Iniciar') === 'Em Execução' || (rev.statusGeral || 'A Iniciar') === 'Elaborando' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' :
                                  'bg-gray-700/40 text-gray-400 border-gray-600'
                                }`}
                                title="Clique para alterar o status desta RPFO"
                              >
                                <option value="A Iniciar" className="bg-[#1c2936] text-gray-300">A Iniciar</option>
                                <option value="Em Execução" className="bg-[#1c2936] text-blue-400">Em Execução</option>
                                <option value="Concluída" className="bg-[#1c2936] text-purple-400">Concluída</option>
                                <option value="Em Análise" className="bg-[#1c2936] text-amber-400">Em Análise</option>
                                <option value="Aprovada" className="bg-[#1c2936] text-emerald-400">Aprovada</option>
                              </select>
                            </div>

                            {estaSelecionado && (
                              <span className="text-[10px] bg-[#84cc16] text-black px-2 py-0.5 rounded-full font-bold">
                                Selecionada
                              </span>
                            )}
                            {rev.observacao && rev.observacao.includes('CGU') ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alternarTagCGU(rev.id);
                              }}
                              className="group/cgu text-[10px] bg-amber-500/20 hover:bg-red-500/20 text-amber-300 hover:text-red-300 px-2 py-0.5 rounded-md font-bold border border-amber-500/30 hover:border-red-500/40 transition cursor-pointer flex items-center gap-1"
                              title="Clique para remover a tag CGU desta RPFO"
                            >
                              <span>CGU</span>
                              <X size={10} className="opacity-60 group-hover/cgu:opacity-100" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                alternarTagCGU(rev.id);
                              }}
                              className="text-[10px] text-gray-500 hover:text-amber-300 bg-transparent hover:bg-amber-500/10 border border-dashed border-gray-700 hover:border-amber-500/40 px-1.5 py-0.5 rounded-md font-medium transition cursor-pointer flex items-center gap-0.5 opacity-60 hover:opacity-100"
                              title="Adicionar tag CGU nesta RPFO"
                            >
                              <Plus size={10} />
                              <span>CGU</span>
                            </button>
                          )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span>Contrato: <strong className="text-gray-300 font-mono">{rev.contrato}</strong></span>
                            <span>•</span>
                            <span>Empresa: <strong className="text-gray-300">{rev.contratada}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 lg:gap-8 flex-wrap">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Preço Inicial (PI)</span>
                          <span className="text-sm font-bold text-gray-200 font-mono">R$ {rev.precoInicial}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#84cc16] block mb-0.5">PI + RPFO</span>
                          <span className="text-sm font-bold text-white font-mono">R$ {rev.precoFinal}</span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Variação Acumulada</span>
                          <div className="flex items-center gap-1.5 font-mono">
                            <span className={`text-sm font-bold ${rev.ehPositivo ? 'text-emerald-400' : 'text-rose-400'}`}>
                              R$ {rev.acumulado}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                              rev.ehPositivo ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                            }`}>
                              {rev.percentual}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end lg:self-center">
                        {podeEditar && (
                          <div className="flex items-center gap-1 bg-[#131c26] p-1 rounded-xl border border-gray-700/60" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRevisaoEmEdicao({ ...rev });
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#84cc16] hover:bg-gray-700/40 transition cursor-pointer"
                              title="Editar Dados desta RPFO"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRevisaoParaExcluir(rev);
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-700/40 transition cursor-pointer"
                              title="Excluir"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        )}

                        <div className="w-8 h-8 rounded-full bg-[#131c26] text-gray-400 flex items-center justify-center">
                          {estaAberto ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </div>
                      </div>

                    </div>

                    {estaAberto && (
                      <div className="px-6 pb-6 pt-2 border-t border-gray-800 bg-[#141e2b] animate-in fade-in duration-200">
                        <div className="mb-4 flex items-center justify-between text-xs text-gray-400 pt-2 flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-300 uppercase tracking-wider text-[11px]">
                              Fluxo das Etapas ({rev.etapas.length} etapas)
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                adicionarEtapaRPFO(rev.id);
                              }}
                              className="px-2.5 py-1 bg-[#84cc16]/20 hover:bg-[#84cc16] text-[#84cc16] hover:text-black rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                              title="Adicionar mais uma etapa a esta RPFO"
                            >
                              <Plus size={12} strokeWidth={3} /> Adicionar Etapa
                            </button>
                          </div>
                          <span className="font-mono text-gray-400">Processo SEI: <strong className="text-white">{rev.processoSei}</strong></span>
                        </div>

                        {/* RÉGUA DINÂMICA DE ETAPAS */}
                        <div className="overflow-x-auto py-4" onClick={(e) => e.stopPropagation()}>
                          <div className="relative flex items-center justify-between min-w-[780px] px-4 gap-4">
                            <div className="absolute left-8 right-8 top-[36px] h-[3px] bg-gray-700/80 -z-0" />

                            {rev.etapas.map((etapa, idx) => {
                              const ehConcluido = etapa.status === 'concluido';

                              return (
                                <div key={idx} className="flex flex-col items-center text-center relative z-10 w-32 shrink-0 group/etapa">
                                  {/* BOTÕES DE CONTROLE: MOVER ESQUERDA / DIREITA / EXCLUIR */}
                                  <div className="flex items-center gap-1 mb-1.5 opacity-60 group-hover/etapa:opacity-100 transition">
                                    <button
                                      type="button"
                                      disabled={idx === 0}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moverEtapaRPFO(rev.id, idx, 'esq');
                                      }}
                                      className={`p-1 rounded-md text-[10px] font-bold border transition ${
                                        idx === 0
                                          ? 'opacity-20 cursor-not-allowed border-transparent text-gray-600'
                                          : 'bg-[#182635] hover:bg-[#5390f5] text-gray-300 hover:text-white border-gray-700 cursor-pointer'
                                      }`}
                                      title="Mover para esquerda"
                                    >
                                      <ChevronLeft size={11} />
                                    </button>

                                    <button
                                      type="button"
                                      disabled={idx === rev.etapas.length - 1}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        moverEtapaRPFO(rev.id, idx, 'dir');
                                      }}
                                      className={`p-1 rounded-md text-[10px] font-bold border transition ${
                                        idx === rev.etapas.length - 1
                                          ? 'opacity-20 cursor-not-allowed border-transparent text-gray-600'
                                          : 'bg-[#182635] hover:bg-[#5390f5] text-gray-300 hover:text-white border-gray-700 cursor-pointer'
                                      }`}
                                      title="Mover para direita"
                                    >
                                      <ChevronRight size={11} />
                                    </button>

                                    {rev.etapas.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removerEtapaRPFO(rev.id, idx);
                                        }}
                                        className="p-1 rounded-md bg-red-950/60 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/60 transition cursor-pointer ml-1"
                                        title="Remover esta etapa"
                                      >
                                        <X size={11} strokeWidth={2.5} />
                                      </button>
                                    )}
                                  </div>

                                  <div className="h-6 flex items-center justify-center mb-2">
                                    {ehConcluido ? (
                                      <input
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={10}
                                        placeholder="DD/MM/AAAA"
                                        value={etapa.data && etapa.data !== 'Concluído' ? etapa.data : ''}
                                        onChange={(e) => lidarComMudancaDataEtapa(rev.id, idx, e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-24 text-[11px] font-mono text-center bg-[#111922] border border-[#84cc16]/60 rounded-md text-[#84cc16] font-bold py-0.5 focus:outline-none focus:ring-1 focus:ring-[#84cc16]"
                                        title="Digite apenas números (DD/MM/AAAA)"
                                      />
                                    ) : (
                                      <span className={`text-[10px] font-mono font-medium truncate max-w-[110px] ${
                                        etapa.status === 'andamento' ? 'text-amber-400 font-bold' :
                                        etapa.status === 'nd' ? 'text-gray-200 font-bold' :
                                        'text-gray-400'
                                      }`}>
                                        {etapa.data}
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    disabled={!podeEditar}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (podeEditar) alternarStatusEtapa(rev.id, idx);
                                    }}
                                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition-all shadow-lg ${
                                      podeEditar ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-not-allowed opacity-90'
                                    } ${
                                      etapa.status === 'concluido'
                                        ? 'bg-[#84cc16] text-black shadow-[#84cc16]/30'
                                        : etapa.status === 'andamento'
                                        ? 'bg-amber-400 text-black shadow-amber-400/30'
                                        : etapa.status === 'nd'
                                        ? 'bg-white text-gray-900 border-2 border-gray-300 shadow-white/20'
                                        : 'bg-red-600 text-white shadow-red-600/30'
                                    }`}
                                    title={podeEditar ? "Clique para alternar o status" : "Acesso apenas para visualização"}
                                  >
                                    {etapa.status === 'concluido' ? (
                                      <Check size={18} strokeWidth={3} />
                                    ) : etapa.status === 'andamento' ? (
                                      <Clock size={17} strokeWidth={3} />
                                    ) : etapa.status === 'nd' ? (
                                      <span className="text-[11px] font-extrabold tracking-tight">ND</span>
                                    ) : (
                                      <Clock size={17} />
                                    )}
                                  </button>

                                  <input
                                    type="text"
                                    value={etapa.nome}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => renomearEtapaRPFO(rev.id, idx, e.target.value)}
                                    className="w-full text-center text-[11px] font-semibold text-gray-200 mt-2 leading-tight bg-transparent border border-transparent hover:border-gray-600 focus:border-[#5390f5] focus:bg-[#111922] rounded-md px-1 py-0.5 focus:outline-none transition"
                                    title="Clique para editar o nome desta etapa"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* MINI-SESSÃO GOOGLE DRIVE */}
                        <div className="mt-4 pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-gray-400" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                            <span className="font-semibold text-gray-300 shrink-0">Drive:</span>
                            <input
                              type="url"
                              placeholder="Cole o link do Google Drive desta obra..."
                              value={rev.linkDrive || ''}
                              onChange={(e) => atualizarLinkDrive(rev.id, e.target.value)}
                              className="px-3 py-1.5 bg-[#111922] border border-gray-700 rounded-lg text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#5390f5] flex-1 max-w-md"
                            />
                            {rev.linkDrive && (
                              <a
                                href={rev.linkDrive}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 bg-[#5390f5] hover:bg-[#437de0] text-white text-xs font-bold rounded-lg transition flex items-center gap-1 shrink-0"
                              >
                                <span>Abrir</span>
                                <ArrowUpRight size={13} />
                              </a>
                            )}
                          </div>
                          
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIdRpfoEmEspecificacao(rev.id);
                              setTelaAtiva('especificacoes');
                            }}
                            className="bg-[#84cc16] hover:bg-[#72b412] text-black px-4 py-2 rounded-xl font-bold transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#84cc16]/20 active:scale-95 self-end sm:self-auto shrink-0"
                          >
                            <span>Ver Especificações Completas</span>
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* MODAL EDITAR RPFO DENTRO DO DASHBOARD */}
        {revisaoEmEdicao && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center">
                    <Edit3 size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Editar Valores da RPFO</h3>
                    <p className="text-xs text-gray-400">{revisaoEmEdicao.br}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRevisaoEmEdicao(null)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarEdicaoRevisao} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Tipo de Modal / Obra
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-[#15202b] rounded-xl border border-gray-700">
                    {[
                      { id: 'Rodovia', label: 'Rodovia' },
                      { id: 'Hidrovia', label: 'Hidrovia' },
                      { id: 'Ferrovia', label: 'Ferrovia' }
                    ].map((mod) => {
                      const ativa = (revisaoEmEdicao.modalidade || 'Rodovia') === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setRevisaoEmEdicao({ ...revisaoEmEdicao, modalidade: mod.id })}
                          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            ativa
                              ? mod.id === 'Rodovia' ? 'bg-[#84cc16] text-black shadow-md'
                              : mod.id === 'Hidrovia' ? 'bg-cyan-500 text-black shadow-md'
                              : 'bg-amber-500 text-black shadow-md'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                          }`}
                        >
                          {ativa && <Check size={12} strokeWidth={3} />}
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Identificação da Obra / Trecho</label>
                  <input
                    type="text"
                    required
                    value={revisaoEmEdicao.br}
                    onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, br: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Preço Inicial (PI)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 481.714.777,66"
                      value={revisaoEmEdicao.precoInicial}
                      onChange={(e) => setRevisaoEmEdicao(recalcularCamposRPFO(revisaoEmEdicao, 'precoInicial', e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">PI + RPFO Final</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: 470.861.602,10"
                      value={revisaoEmEdicao.precoFinal}
                      onChange={(e) => setRevisaoEmEdicao(recalcularCamposRPFO(revisaoEmEdicao, 'precoFinal', e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Valor Acumulado (Automático)</label>
                    <input
                      type="text"
                      readOnly
                      tabIndex="-1"
                      value={revisaoEmEdicao.acumulado || 'R$ 0,00'}
                      className={`w-full px-3.5 py-2.5 bg-[#111922] rounded-xl text-sm font-bold font-mono cursor-not-allowed select-none transition border ${
                        revisaoEmEdicao.ehPositivo 
                          ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' 
                          : 'text-rose-400 border-rose-500/40 bg-rose-950/20'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Percentual (Automático)</label>
                    <input
                      type="text"
                      readOnly
                      tabIndex="-1"
                      value={revisaoEmEdicao.percentual || '0,00%'}
                      className={`w-full px-3.5 py-2.5 bg-[#111922] rounded-xl text-sm font-bold font-mono cursor-not-allowed select-none transition border ${
                        revisaoEmEdicao.ehPositivo 
                          ? 'text-emerald-400 border-emerald-500/40 bg-emerald-950/20' 
                          : 'text-rose-400 border-rose-500/40 bg-rose-950/20'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Status Geral</label>
                    <select
                      value={revisaoEmEdicao.statusGeral || 'A Iniciar'}
                      onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, statusGeral: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#84cc16]"
                    >
                      <option value="A Iniciar">A Iniciar</option>
                      <option value="Em Execução">Em Execução</option>
                      <option value="Concluída">Concluída</option>
                      <option value="Em Análise">Em Análise</option>
                      <option value="Aprovada">Aprovada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Contrato nº</label>
                    <input
                      type="text"
                      value={revisaoEmEdicao.contrato || ''}
                      onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, contrato: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Processo SEI</label>
                    <input
                      type="text"
                      value={revisaoEmEdicao.processoSei || ''}
                      onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, processoSei: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Link do Google Drive</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={revisaoEmEdicao.linkDrive || ''}
                    onChange={(e) => setRevisaoEmEdicao({ ...revisaoEmEdicao, linkDrive: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRevisaoEmEdicao(null)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-700/60 hover:bg-gray-700 text-gray-300 text-sm font-medium transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#72b412] text-black text-sm font-bold transition shadow cursor-pointer"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
{/* MODAL CADASTRAR NOVA RPFO NO DASHBOARD */}
        {modalNovaRevisao && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center">
                    <Plus size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Cadastrar Nova RPFO</h3>
                    <p className="text-xs text-gray-400">Insira os dados orçamentários do trecho</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalNovaRevisao(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={salvarNovaRevisao} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Tipo de Modal / Obra
                  </label>
                  <div className="grid grid-cols-3 gap-2 p-1 bg-[#15202b] rounded-xl border border-gray-700">
                    {[
                      { id: 'Rodovia', label: 'Rodovia' },
                      { id: 'Hidrovia', label: 'Hidrovia' },
                      { id: 'Ferrovia', label: 'Ferrovia' }
                    ].map((mod) => {
                      const ativa = (formNovaRpfo.modalidade || 'Rodovia') === mod.id;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => setFormNovaRpfo({ ...formNovaRpfo, modalidade: mod.id })}
                          className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            ativa
                              ? mod.id === 'Rodovia' ? 'bg-[#84cc16] text-black shadow-md'
                              : mod.id === 'Hidrovia' ? 'bg-cyan-500 text-black shadow-md'
                              : 'bg-amber-500 text-black shadow-md'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800/40'
                          }`}
                        >
                          {ativa && <Check size={12} strokeWidth={3} />}
                          {mod.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Identificação da Obra / Trecho
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={
                      formNovaRpfo.modalidade === 'Hidrovia' ? "Ex: Hidro - 720/ITA" :
                      formNovaRpfo.modalidade === 'Ferrovia' ? "Ex: Ferrovia Norte-Sul ou EF-170" :
                      "Ex: BR-230/PA ou BR-101/SC"
                    }
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

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Empresa Contratada</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: CLC, COESA"
                      value={formNovaRpfo.contratada}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, contratada: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Contrato nº</label>
                    <input
                      type="text"
                      placeholder="Ex: 05 00287/2025"
                      value={formNovaRpfo.contrato}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, contrato: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Processo SEI</label>
                    <input
                      type="text"
                      placeholder="Ex: 50605.001211/2026-76"
                      value={formNovaRpfo.processoSei}
                      onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, processoSei: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Link do Google Drive (Opcional)</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={formNovaRpfo.linkDrive || ''}
                    onChange={(e) => setFormNovaRpfo({ ...formNovaRpfo, linkDrive: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#5390f5]"
                  />
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalNovaRevisao(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-700/60 hover:bg-gray-700 text-gray-300 text-sm font-medium transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#72b412] text-black text-sm font-bold transition shadow cursor-pointer"
                  >
                    Salvar RPFO
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {revisaoParaExcluir && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in zoom-in duration-150">
            <div className="bg-[#1c2936] border border-red-700/60 w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl relative">
              <div className="w-12 h-12 rounded-2xl bg-red-900/40 border border-red-600/50 text-red-400 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Excluir Revisão?</h3>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Você realmente deseja remover a revisão da <strong className="text-white">"{revisaoParaExcluir.br}"</strong>?
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRevisaoParaExcluir(null)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-700/60 hover:bg-gray-700 text-gray-300 text-xs font-semibold transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmarExclusaoRevisao}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition shadow-lg cursor-pointer"
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
// TELA EXCLUSIVA DO ADMINISTRADOR: MONITORAMENTO DE ACESSOS, SESSÕES E PERMISSÕES
  if (telaAtiva === 'usuarios' && usuario.perfil === 'admin') {
    const totalUsuarios = listaUsuariosAcesso.length;
    const usuariosOnline = listaUsuariosAcesso.filter(u => u.status === 'online');
    const usuariosOffline = listaUsuariosAcesso.filter(u => u.status === 'offline');

    const alternarStatusSessao = (id) => {
      setListaUsuariosAcesso(prev => prev.map(u => {
        if (u.id !== id) return u;
        const novoStatus = u.status === 'online' ? 'offline' : 'online';
        return {
          ...u,
          status: novoStatus,
          ultimoAcesso: novoStatus === 'online' ? 'Agora mesmo' : 'Desconectado pelo Admin'
        };
      }));
    };

    return (
      <div className="min-h-screen bg-[#0d141c] text-white p-4 md:p-8 font-sans">
        
        <header className="flex justify-between items-center max-w-7xl mx-auto w-full pb-6 mb-8 border-b border-gray-800/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTelaAtiva('hub')}
              className="text-gray-400 hover:text-white transition flex items-center gap-1.5 text-xs bg-[#16212e] px-3.5 py-2 rounded-xl border border-gray-700/60 cursor-pointer"
            >
              <ChevronLeft size={16} /> Voltar ao Início
            </button>
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-400" />
              <span className="text-sm font-bold text-gray-300">| Painel Administrativo de Usuários e Permissões</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-emerald-500/15 text-emerald-400 font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5">
              <Wifi size={14} className="animate-pulse" />
              Sessão Master Ativa
            </span>
            <button
              onClick={fazerLogout}
              className="p-2 bg-[#16212e] hover:bg-red-950/40 border border-gray-700 rounded-xl text-gray-300 hover:text-red-400 transition cursor-pointer"
              title="Sair"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* CARDS DE INDICADORES DE CONEXÃO */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#16212e] border border-gray-800 rounded-3xl p-5 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Usuários Cadastrados
                </span>
                <span className="text-3xl font-extrabold text-white font-mono">{totalUsuarios}</span>
                <p className="text-[11px] text-gray-400 mt-1">Acesso liberado na rede local</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#5390f5]/15 text-[#5390f5] flex items-center justify-center">
                <Users size={24} />
              </div>
            </div>

            <div className="bg-[#16212e] border border-emerald-500/40 rounded-3xl p-5 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Online Neste Momento
                </span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">{usuariosOnline.length}</span>
                <p className="text-[11px] text-gray-400 mt-1">Conectados e interagindo com as RPFOs</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <UserCheck size={24} />
              </div>
            </div>

            <div className="bg-[#16212e] border border-gray-800 rounded-3xl p-5 flex items-center justify-between shadow-xl">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Deslogados / Offline
                </span>
                <span className="text-3xl font-extrabold text-gray-400 font-mono">{usuariosOffline.length}</span>
                <p className="text-[11px] text-gray-400 mt-1">Sem sessão ativa nos últimos 15 min</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gray-800 text-gray-400 flex items-center justify-center">
                <UserX size={24} />
              </div>
            </div>
          </div>

          {/* TABELA DE SESSÕES, PERMISSÕES E CRIAÇÃO DE CONTAS */}
          <div className="bg-[#131c26] rounded-3xl border border-gray-800/80 p-6 shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-800 gap-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Painel de Presença e Controle de Acessos</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Crie contas comuns, defina permissões por RPFO e monitore conexões em tempo real.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUsuarioEmEdicao(null);
                  setFormUsuario({
                    nome: '',
                    usuario: '',
                    cargo: '',
                    nivelPermissao: 'visualizar',
                    rpfosPermitidas: listaRevisoes.map(r => r.id)
                  });
                  setModalUsuarioAberto(true);
                }}
                className="bg-[#84cc16] hover:bg-[#72b412] text-black py-2.5 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-lg cursor-pointer"
              >
                <Plus size={16} />
                <span>Criar Nova Conta</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-800 text-[11px] uppercase tracking-wider text-gray-400">
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Nome do Usuário</th>
                    <th className="py-3 px-4">Login</th>
                    <th className="py-3 px-4">Permissão</th>
                    <th className="py-3 px-4">RPFOs Liberadas</th>
                    <th className="py-3 px-4">Atividade</th>
                    <th className="py-3 px-4 text-right">Gerenciar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 text-xs">
                  {listaUsuariosAcesso.map((user) => {
                    const estaOnline = user.status === 'online';

                    return (
                      <tr key={user.id} className="hover:bg-[#182635]/60 transition">
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            estaOnline 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                              : 'bg-gray-800 text-gray-400 border border-gray-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${estaOnline ? 'bg-emerald-400 animate-pulse' : 'bg-gray-500'}`} />
                            {estaOnline ? 'ONLINE' : 'OFFLINE'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                          {user.nome}
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[#5390f5] whitespace-nowrap">
                          {user.usuario}
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                            user.nivelPermissao === 'editar' 
                              ? 'bg-[#84cc16]/20 text-[#84cc16] border border-[#84cc16]/40' 
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}>
                            {user.nivelPermissao === 'editar' ? 'Editar e Visualizar' : 'Apenas Visualizar'}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-gray-300 whitespace-nowrap">
                          {user.rpfosPermitidas === 'todas' 
                            ? 'Todas as RPFOs' 
                            : `${(user.rpfosPermitidas || []).length} selecionada(s)`}
                        </td>

                        <td className="py-3.5 px-4 text-gray-400 whitespace-nowrap font-medium">
                          {user.ultimoAcesso}
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setUsuarioEmEdicao(user);
                              setFormUsuario({
                                nome: user.nome,
                                usuario: user.usuario,
                                senha: user.senha || '',
                                nivelPermissao: user.nivelPermissao || 'visualizar',
                                modulosPermitidos: user.modulosPermitidos || ['calendario', 'revisoes', 'refs'],
                                rpfosPermitidas: user.rpfosPermitidas === 'todas' ? listaRevisoes.map(r => r.id) : (user.rpfosPermitidas || [])
                              });
                              setModalUsuarioAberto(true);
                            }}
                            className="px-2.5 py-1.5 bg-[#182635] hover:bg-[#5390f5] text-gray-300 hover:text-white rounded-xl text-[11px] font-bold border border-gray-700 transition cursor-pointer"
                          >
                            Editar Permissões
                          </button>

                          <button
                            type="button"
                            onClick={() => alternarStatusSessao(user.id)}
                            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                              estaOnline
                                ? 'bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40'
                                : 'bg-[#182635] hover:bg-emerald-600 text-gray-300 hover:text-white border border-gray-700'
                            }`}
                            title={estaOnline ? "Derrubar sessão" : "Reconectar"}
                          >
                            {estaOnline ? 'Desconectar' : 'Reconectar'}
                          </button>

                          <button
                            type="button"
                            onClick={() => setListaUsuariosAcesso(prev => prev.filter(u => u.id !== user.id))}
                            className="px-2 py-1.5 bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-[11px] border border-red-800/50 transition cursor-pointer"
                            title="Excluir Conta"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* MODAL CRIAR / EDITAR CONTA DE USUÁRIO COM PERMISSÕES */}
        {modalUsuarioAberto && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-150">
            <div className="bg-[#1c2936] border border-gray-700 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#84cc16]/20 text-[#84cc16] flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {usuarioEmEdicao ? 'Editar Permissões da Conta' : 'Criar Nova Conta de Usuário'}
                    </h3>
                    <p className="text-xs text-gray-400">Defina o acesso às seções e RPFOs</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalUsuarioAberto(false)}
                  className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-700/50 transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (!formUsuario.nome.trim() || !formUsuario.usuario.trim()) return;

                if (usuarioEmEdicao) {
                  setListaUsuariosAcesso(prev => prev.map(u => u.id === usuarioEmEdicao.id ? {
                    ...u,
                    nome: formUsuario.nome.trim(),
                    usuario: formUsuario.usuario.trim().toLowerCase(),
                    senha: formUsuario.senha || '123456',
                    nivelPermissao: formUsuario.nivelPermissao,
                    modulosPermitidos: formUsuario.modulosPermitidos,
                    rpfosPermitidas: formUsuario.rpfosPermitidas
                  } : u));
                } else {
                  const novo = {
                    id: Date.now(),
                    nome: formUsuario.nome.trim(),
                    usuario: formUsuario.usuario.trim().toLowerCase(),
                    senha: formUsuario.senha || '123456',
                    perfil: 'usuario',
                    status: 'offline',
                    ultimoAcesso: 'Nunca acessou',
                    ip: '192.168.1.150',
                    nivelPermissao: formUsuario.nivelPermissao,
                    modulosPermitidos: formUsuario.modulosPermitidos,
                    rpfosPermitidas: formUsuario.rpfosPermitidas
                  };
                  setListaUsuariosAcesso([...listaUsuariosAcesso, novo]);
                }

                setModalUsuarioAberto(false);
              }} className="space-y-4">

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={formUsuario.nome}
                    onChange={(e) => setFormUsuario({ ...formUsuario, nome: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Login (Usuário)</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: joao.silva"
                      value={formUsuario.usuario}
                      onChange={(e) => setFormUsuario({ ...formUsuario, usuario: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Senha de Acesso</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: senha123"
                      value={formUsuario.senha || ''}
                      onChange={(e) => setFormUsuario({ ...formUsuario, senha: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#15202b] border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#84cc16]"
                    />
                  </div>
                </div>

                {/* OPÇÕES DE SEÇÕES / MÓDULOS PERMITIDOS */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Seções Liberadas no Sistema</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'calendario', label: 'Calendário' },
                      { id: 'revisoes', label: 'RPFOs' },
                      { id: 'refs', label: 'REFs' }
                    ].map((mod) => {
                      const modPermitidos = formUsuario.modulosPermitidos || ['calendario', 'revisoes', 'refs'];
                      const liberado = modPermitidos.includes(mod.id);

                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => {
                            const atual = [...modPermitidos];
                            const novo = liberado ? atual.filter(m => m !== mod.id) : [...atual, mod.id];
                            setFormUsuario({ ...formUsuario, modulosPermitidos: novo });
                          }}
                          className={`py-2 px-2 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
                            liberado 
                              ? 'bg-[#84cc16]/20 border-[#84cc16]/60 text-[#84cc16]' 
                              : 'bg-[#121c27] border-gray-800 text-gray-500'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                            liberado ? 'bg-[#84cc16] border-[#84cc16] text-black' : 'border-gray-600'
                          }`}>
                            {liberado && <Check size={10} strokeWidth={3} />}
                          </div>
                          <span>{mod.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nível de Permissão Geral</label>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-[#15202b] rounded-xl border border-gray-700">
                    <button
                      type="button"
                      onClick={() => setFormUsuario({ ...formUsuario, nivelPermissao: 'visualizar' })}
                      className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        formUsuario.nivelPermissao === 'visualizar' ? 'bg-cyan-500 text-black shadow-md' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Apenas Visualizar (Só Ler)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormUsuario({ ...formUsuario, nivelPermissao: 'editar' })}
                      className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                        formUsuario.nivelPermissao === 'editar' ? 'bg-[#84cc16] text-black shadow-md' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Pode Editar e Inserir
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-gray-300">RPFOs que este usuário pode acessar:</label>
                    <button
                      type="button"
                      onClick={() => {
                        const todasIds = listaRevisoes.map(r => r.id);
                        const marcadoTudo = formUsuario.rpfosPermitidas.length === todasIds.length;
                        setFormUsuario({ ...formUsuario, rpfosPermitidas: marcadoTudo ? [] : todasIds });
                      }}
                      className="text-[11px] text-[#5390f5] hover:underline cursor-pointer font-bold"
                    >
                      {formUsuario.rpfosPermitidas.length === listaRevisoes.length ? 'Desmarcar Todas' : 'Selecionar Todas'}
                    </button>
                  </div>

                  <div className="bg-[#15202b] border border-gray-700 rounded-2xl p-3 max-h-48 overflow-y-auto space-y-2">
                    {listaRevisoes.map((rev) => {
                      const selecionado = formUsuario.rpfosPermitidas.includes(rev.id);

                      return (
                        <div
                          key={rev.id}
                          onClick={() => {
                            const atual = formUsuario.rpfosPermitidas;
                            const novo = selecionado ? atual.filter(id => id !== rev.id) : [...atual, rev.id];
                            setFormUsuario({ ...formUsuario, rpfosPermitidas: novo });
                          }}
                          className={`flex items-center justify-between p-2.5 rounded-xl border transition cursor-pointer text-xs ${
                            selecionado ? 'bg-[#1e293b] border-[#84cc16]/60 text-white' : 'bg-[#121c27] border-gray-800 text-gray-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              selecionado ? 'bg-[#84cc16] border-[#84cc16] text-black' : 'border-gray-600'
                            }`}>
                              {selecionado && <Check size={12} strokeWidth={3} />}
                            </div>
                            <span className="font-bold">{rev.br}</span>
                          </div>
                          <span className="text-[10px] text-gray-400">{rev.contratada}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModalUsuarioAberto(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-700/60 hover:bg-gray-700 text-gray-300 text-sm font-medium transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#84cc16] hover:bg-[#72b412] text-black text-sm font-bold transition shadow cursor-pointer"
                  >
                    {usuarioEmEdicao ? 'Salvar Alterações' : 'Criar Conta'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#111922] text-white p-8 flex flex-col items-center justify-center font-sans">
      <div className="bg-[#1c2936] p-8 rounded-3xl border border-gray-800 text-center max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2 capitalize text-[#dce8eb]">{telaAtiva}</h2>
        <p className="text-xs text-gray-400 mb-6">Módulo pronto para receber a integração de dados.</p>
        <button
          onClick={() => setTelaAtiva('hub')}
          className="bg-[#5390f5] hover:bg-[#437de0] text-white py-2 px-6 rounded-xl text-sm font-medium transition cursor-pointer"
        >
          Voltar às opções
        </button>
      </div>
    </div>
  );
}