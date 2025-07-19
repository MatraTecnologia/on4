export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  publishedAt: string
  category: string
  tags: string[]
  readTime: number
}

// Posts do blog (em produção, isso viria do Supabase)
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Contabilidade para Influencers: Saiba mais!",
    slug: "contabilidade-para-influencers",
    excerpt: "É influenciador ou conhece algum? Fique por dentro de todos os detalhes para evitar surpresas fiscais.",
    content: `
# Contabilidade para Influencers: Saiba mais!

O mundo digital transformou a forma como as pessoas trabalham e geram renda. Os influenciadores digitais se tornaram uma categoria profissional importante, movimentando bilhões de reais no Brasil. Mas com essa nova realidade, surgem também responsabilidades fiscais que muitos ainda desconhecem.

## Por que influencers precisam de contabilidade?

### 1. Obrigações Fiscais
Todo influenciador que recebe pagamentos por suas atividades precisa declarar esses valores ao Imposto de Renda. Isso inclui:
- Publicidade paga
- Parcerias comerciais
- Vendas de produtos próprios
- Monetização de plataformas

### 2. Planejamento Tributário
Com o planejamento adequado, é possível reduzir significativamente a carga tributária:
- **Pessoa Física**: Tributação pode chegar a 27,5%
- **MEI**: Apenas R$ 66,60 por mês (2024)
- **Pessoa Jurídica**: Pode variar de 6% a 16,33%

## Principais Desafios dos Influencers

### Receitas Variáveis
Os ganhos de um influenciador podem variar drasticamente de mês para mês, o que torna o planejamento financeiro essencial.

### Múltiplas Fontes de Renda
- YouTube (AdSense)
- Instagram (parcerias)
- TikTok (Creator Fund)
- Vendas de produtos
- Cursos online
- Lives e eventos

### Documentação
Manter todos os comprovantes organizados é fundamental para:
- Declaração do Imposto de Renda
- Comprovação de despesas dedutíveis
- Controle financeiro pessoal

## Como a ON4 pode ajudar?

### Consultoria Especializada
Nossa equipe entende as particularidades do mercado digital e pode orientar sobre:
- Melhor regime tributário
- Organização financeira
- Cumprimento de obrigações

### Serviços Oferecidos
- Abertura de CNPJ
- Declaração de Imposto de Renda
- Planejamento tributário
- Controle financeiro
- Emissão de notas fiscais

## Dicas Importantes

1. **Organize suas receitas**: Mantenha um controle detalhado de todos os ganhos
2. **Guarde comprovantes**: Equipamentos, internet e outros gastos podem ser deduzidos
3. **Planeje-se**: Reserve uma parte dos ganhos para impostos
4. **Busque orientação**: Um contador especializado faz toda a diferença

## Conclusão

A contabilidade para influencers não precisa ser complicada. Com a orientação adequada, é possível manter tudo em ordem e ainda otimizar os tributos pagos.

**Precisa de ajuda com sua contabilidade digital?** Entre em contato conosco e descubra como podemos simplificar sua vida fiscal!
    `,
    image: "/images/influencer-accounting.png",
    author: "Equipe ON4",
    publishedAt: "2024-01-15",
    category: "Tributação",
    tags: ["influencers", "tributação", "mei", "pessoa jurídica"],
    readTime: 8,
  },
  {
    id: "2",
    title: "IRPF 2025: Tudo o que você precisa saber!",
    slug: "irpf-2025-guia-completo",
    excerpt: "Março chegou, saiba todos os detalhes para fazer a sua declaração de imposto de renda.",
    content: `
# IRPF 2025: Tudo o que você precisa saber!

A declaração do Imposto de Renda Pessoa Física (IRPF) 2025 está chegando e é hora de se preparar. Este guia completo vai te ajudar a entender tudo sobre o processo.

## Calendário IRPF 2025

### Datas Importantes
- **Início das declarações**: 15 de março de 2025
- **Prazo final**: 31 de maio de 2025
- **Primeira restituição**: Junho de 2025
- **Última restituição**: Dezembro de 2025

## Quem deve declarar?

### Obrigatório para quem:
- Recebeu rendimentos tributáveis acima de R$ 30.639,90 em 2024
- Recebeu rendimentos isentos acima de R$ 200.000,00
- Teve ganho de capital na venda de bens
- Realizou operações na bolsa de valores
- Possui bens acima de R$ 800.000,00

## Principais Mudanças em 2025

### 1. Aumento da Faixa de Isenção
A faixa de isenção aumentou para R$ 30.639,90, beneficiando milhões de contribuintes.

### 2. Dedução Padrão
Nova opção de dedução padrão de 20% dos rendimentos tributáveis, limitada a R$ 16.754,34.

### 3. Simplificação do Processo
Interface mais intuitiva e processo mais ágil para envio da declaração.

## Documentos Necessários

### Rendimentos
- Informe de rendimentos do empregador
- Comprovantes de outras fontes de renda
- Extratos de investimentos

### Despesas Dedutíveis
- Gastos com educação
- Despesas médicas
- Contribuições previdenciárias
- Pensão alimentícia

### Bens e Direitos
- Imóveis
- Veículos
- Investimentos
- Contas bancárias

## Dicas para não cair na malha fina

### 1. Conferir Dados
Verifique se todos os dados estão corretos e consistentes.

### 2. Guardar Comprovantes
Mantenha todos os documentos organizados por pelo menos 5 anos.

### 3. Declarar Tudo
Omitir informações pode gerar problemas futuros.

### 4. Usar o Programa Oficial
Sempre utilize o programa oficial da Receita Federal.

## Restituição do IR

### Como Receber Mais Rápido
- Declare logo no início do prazo
- Use a declaração pré-preenchida
- Tenha conta no Banco do Brasil, Caixa, Bradesco, Itaú ou Santander

### Ordem de Pagamento
1. Idosos acima de 80 anos
2. Idosos entre 60 e 79 anos
3. Deficientes físicos ou mentais
4. Professores
5. Demais contribuintes por ordem de envio

## Multas e Penalidades

### Atraso na Entrega
- Multa mínima: R$ 165,74
- Multa máxima: 20% do imposto devido

### Informações Incorretas
- Multa de 75% sobre o imposto não pago
- Juros de mora

## Como a ON4 pode ajudar?

### Serviços Oferecidos
- Elaboração completa da declaração
- Revisão de declarações anteriores
- Orientação sobre investimentos
- Planejamento tributário

### Vantagens
- Equipe especializada
- Atendimento personalizado
- Garantia de qualidade
- Suporte durante todo o processo

## Conclusão

A declaração do IRPF não precisa ser um pesadelo. Com organização e a ajuda certa, o processo pode ser simples e tranquilo.

**Precisa de ajuda com sua declaração?** A ON4 está aqui para simplificar sua vida fiscal!
    `,
    image: "/images/tax-lion-2025.png",
    author: "Equipe ON4",
    publishedAt: "2024-01-10",
    category: "Imposto de Renda",
    tags: ["irpf", "imposto de renda", "declaração", "2025"],
    readTime: 12,
  },
  {
    id: "3",
    title: "MEI 2024: Guia Completo para Microempreendedores",
    slug: "mei-2024-guia-completo",
    excerpt: "Tudo sobre o MEI em 2024: como abrir, obrigações, benefícios e mudanças na legislação.",
    content: `
# MEI 2024: Guia Completo para Microempreendedores

O Microempreendedor Individual (MEI) continua sendo uma das melhores opções para quem quer formalizar seu negócio no Brasil. Vamos entender tudo sobre o MEI em 2024.

## O que é o MEI?

O MEI é uma categoria empresarial criada para formalizar pequenos negócios. É ideal para quem trabalha por conta própria e quer sair da informalidade.

### Características Principais
- Faturamento máximo de R$ 81.000,00 por ano
- Até 1 funcionário contratado
- Atividades permitidas específicas
- Tributação simplificada

## Benefícios do MEI

### 1. Previdência Social
- Aposentadoria por idade
- Aposentadoria por invalidez
- Auxílio-doença
- Salário-maternidade
- Pensão por morte

### 2. Facilidades Bancárias
- Conta PJ com taxas reduzidas
- Acesso a crédito empresarial
- Cartão de crédito empresarial

### 3. Emissão de Nota Fiscal
- Venda para pessoas jurídicas
- Participação em licitações
- Maior credibilidade no mercado

## Obrigações do MEI em 2024

### 1. DAS Mensal
Valor fixo mensal de R$ 66,60 (comércio/indústria) ou R$ 70,60 (serviços).

### 2. Declaração Anual (DASN-SIMEI)
Deve ser entregue até 31 de maio de cada ano.

### 3. Relatório Mensal
Controle de receitas e despesas mensais.

## Como Abrir MEI em 2024

### Passo a Passo
1. Acesse o Portal do Empreendedor
2. Clique em "Formalize-se"
3. Preencha seus dados pessoais
4. Escolha sua atividade principal
5. Confirme seu endereço
6. Finalize o cadastro

### Documentos Necessários
- CPF
- RG
- Comprovante de endereço
- Número do recibo da última declaração de IR

## Atividades Permitidas

### Mais Procuradas
- Cabeleireiro
- Manicure/Pedicure
- Vendedor ambulante
- Confeiteiro
- Eletricista
- Programador
- Designer gráfico
- Consultor

## Mudanças em 2024

### 1. Novas Atividades
Foram incluídas novas atividades na lista do MEI.

### 2. Fiscalização Digital
Maior integração entre os órgãos fiscalizadores.

### 3. Facilidades no Desenquadramento
Processo mais simples para quem precisa sair do MEI.

## Quando Sair do MEI?

### Situações que Obrigam
- Faturamento acima de R$ 81.000,00
- Contratação de mais de 1 funcionário
- Abertura de filial
- Participação em outra empresa

## MEI x Outros Regimes

### MEI vs ME (Microempresa)
- **MEI**: Até R$ 81.000,00/ano
- **ME**: Até R$ 360.000,00/ano

### Vantagens da ME
- Maior limite de faturamento
- Mais funcionários
- Mais atividades permitidas

## Dicas Importantes

### 1. Controle Financeiro
Mantenha sempre o controle de receitas e despesas.

### 2. Emissão de Notas
Emita nota fiscal sempre que necessário.

### 3. Pagamento em Dia
Mantenha o DAS sempre em dia para evitar problemas.

### 4. Acompanhe as Mudanças
Fique atento às alterações na legislação.

## Como a ON4 pode ajudar?

### Serviços para MEI
- Abertura de MEI
- Controle financeiro
- Emissão de notas fiscais
- Declaração anual
- Orientação sobre desenquadramento

## Conclusão

O MEI continua sendo uma excelente opção para pequenos empreendedores. Com as facilidades de 2024, fica ainda mais fácil manter seu negócio regularizado.

**Quer abrir seu MEI ou precisa de ajuda com as obrigações?** A ON4 está aqui para te ajudar!
    `,
    image: "/placeholder.svg?height=400&width=600",
    author: "Equipe ON4",
    publishedAt: "2024-01-05",
    category: "MEI",
    tags: ["mei", "microempreendedor", "formalização", "2024"],
    readTime: 10,
  },
]

export function getBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPost(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit)
}

export function getBlogCategories(): string[] {
  const categories = blogPosts.map((post) => post.category)
  return [...new Set(categories)]
}
