# 💰 Guia de Registro: Amazon Associates Multi-País

## 🌍 Como Ganhar Comissões em 14 Países

Seu site já está configurado para 14 marketplaces Amazon diferentes. Agora você precisa se registrar nos programas de afiliados de cada país para começar a ganhar dinheiro!

---

## 📋 Status Atual dos Affiliate Tags

| País | Domínio | Tag Atual | Status | Link de Registro |
|------|---------|-----------|--------|------------------|
| 🇺🇸 USA | amazon.com | `globalsupleme-20` | ✅ Ativo | https://affiliate-program.amazon.com |
| 🇨🇦 Canada | amazon.ca | `globalsupleme-20` | ⚠️ Precisa registrar | https://associates.amazon.ca |
| 🇬🇧 UK | amazon.co.uk | `globalsup05-21` | ⚠️ Precisa registrar | https://affiliate-program.amazon.co.uk |
| 🇩🇪 Germany | amazon.de | `globalsup0a6-21` | ⚠️ Precisa registrar | https://partnernet.amazon.de |
| 🇫🇷 France | amazon.fr | `globalsup0f6-21` | ⚠️ Precisa registrar | https://partenaires.amazon.fr |
| 🇮🇹 Italy | amazon.it | `globalsup0bb-21` | ⚠️ Precisa registrar | https://programma-affiliazione.amazon.it |
| 🇪🇸 Spain | amazon.es | `globalsup00f-21` | ⚠️ Precisa registrar | https://afiliados.amazon.es |
| 🇯🇵 Japan | amazon.co.jp | `globalsup-22` | ⚠️ Precisa registrar | https://affiliate.amazon.co.jp |
| 🇦🇺 Australia | amazon.com.au | `globalsup0e0-22` | ⚠️ Precisa registrar | https://affiliate-program.amazon.com.au |
| 🇳🇱 Netherlands | amazon.nl | `globalsup0ae-21` | ⚠️ Precisa registrar | https://partnernet.amazon.nl |
| 🇸🇪 Sweden | amazon.se | `globalsup07f-21` | ⚠️ Precisa registrar | https://partnernet.amazon.se |
| 🇸🇬 Singapore | amazon.sg | `globalsup07-22` | ⚠️ Precisa registrar | https://affiliate-program.amazon.sg |
| 🇵🇱 Poland | amazon.pl | `globalsup0c-21` | ⚠️ Precisa registrar | https://partnernet.amazon.pl |
| 🇸🇦 Saudi Arabia | amazon.sa | `globalsup03-22` | ⚠️ Precisa registrar | https://affiliate-program.amazon.sa |

---

## 🚀 Passo a Passo para Cada País

### 1️⃣ **Registre-se no Programa de Afiliados**

Para cada país que você quer ganhar comissões:

1. **Acesse o link de registro** da tabela acima
2. **Crie uma conta** ou faça login com sua conta Amazon existente
3. **Preencha as informações:**
   - Nome do site: `Global Supplements` ou `www.globalsupplements.site`
   - Categoria: Health & Personal Care / Beauty / Wellness
   - Descrição: Premium supplement marketplace with global distribution
4. **Aguarde aprovação** (normalmente 1-3 dias)

### 2️⃣ **Obtenha Seu Affiliate Tag/ID**

Após aprovação, você receberá um **Affiliate Tag** único para aquele país.

Exemplo:
- USA: `globalsupleme-20`
- UK: `globalsupleme-21`
- Germany: `globalsupleme0a-21`

### 3️⃣ **Atualize o Código com Suas Tags Reais**

Edite o arquivo: `projeto-copia/src/config/amazonMarketplaces.ts`

```typescript
// Substitua as tags com suas tags reais após aprovação
export const AMAZON_MARKETPLACES: AmazonMarketplace[] = [
  {
    id: 'US',
    name: 'United States',
    domain: 'amazon.com',
    affiliateTag: 'SEU-TAG-USA-AQUI', // ← Substitua
    language: 'en',
    currency: 'USD',
    flagCode: 'us',
    flagUrl: 'https://flagcdn.com/w80/us.png'
  },
  // ... repita para cada país
];
```

### 4️⃣ **Faça Build e Deploy**

```bash
cd projeto-copia
npm run build
python3 /tmp/deploy-ai-fixed.py
```

---

## 💡 Dicas Importantes

### ✅ **Taxa de Comissão por Categoria**

| Categoria | Taxa de Comissão |
|-----------|------------------|
| **Premium Beauty** | 10% |
| **Luxury Beauty** | 10% |
| **Beauty** | 8% |
| **Health & Personal Care** | 8% |
| **Sports & Outdoors** | 4% |
| **Electronics** | 4% |

💰 **Seu site está otimizado para categorias de ALTA comissão (8-10%)**

### 🌍 **Programas Regionais da Amazon**

A Amazon tem programas de afiliados **separados** por região:

- **América do Norte**: USA, Canada
- **Europa**: UK, Germany, France, Italy, Spain, Netherlands, Sweden, Poland
- **Ásia-Pacífico**: Japan, Australia, Singapore
- **Oriente Médio**: Saudi Arabia

**Importante**: Você precisa se registrar **separadamente** em cada programa regional.

### 📊 **OneLink (Opcional - Avançado)**

A Amazon oferece o **OneLink** que:
- ✅ Detecta automaticamente o país do visitante
- ✅ Redireciona para o marketplace correto
- ✅ Usa o affiliate tag correto automaticamente

**Link**: https://affiliate-program.amazon.com/onelink

**Seu site já tem isso implementado manualmente**, mas o OneLink oficial da Amazon pode aumentar conversões.

---

## 🎯 Como Funciona no Seu Site

1. **Usuário acessa** www.globalsupplements.site/amazon
2. **"Deliver to United States"** está ativo por padrão
3. **Usuário clica** na bandeira da França 🇫🇷
4. **Sistema muda automaticamente**:
   - Marketplace: amazon.fr
   - Affiliate Tag: globalsup0f6-21
   - Idioma: Francês
   - Moeda: EUR
5. **Links dos produtos** agora redirecionam para amazon.fr com SEU affiliate tag
6. **Você ganha comissão** quando alguém compra!

---

## 📈 Estratégia de Maximização de Lucro

### 🔥 Priorize Estes Países Primeiro:

1. **🇺🇸 USA** - Maior mercado, mais conversões
2. **🇬🇧 UK** - Alto poder de compra, idioma inglês
3. **🇩🇪 Germany** - Maior economia da Europa
4. **🇨🇦 Canada** - Idioma inglês, próximo aos EUA
5. **🇫🇷 France** - Grande mercado europeu

### 💰 Depois expanda para:

6. **🇯🇵 Japan** - Alto consumo de suplementos
7. **🇦🇺 Australia** - Mercado de saúde em crescimento
8. **Outros países europeus**

---

## ⚠️ Requisitos para Aprovação

Para ser aprovado nos programas Amazon Associates:

✅ **Site publicado** e acessível publicamente (já tem!)
✅ **Conteúdo original** sobre produtos
✅ **Política de privacidade** no site
✅ **Termos de uso** claros
✅ **Informar que é site afiliado** da Amazon
✅ **Primeiro qualificar com 3 vendas** em 180 dias (alguns países)

---

## 📞 Suporte Amazon Associates

Se tiver problemas:

- **USA/Global**: https://affiliate-program.amazon.com/help
- **UK/Europa**: https://affiliate-program.amazon.co.uk/help
- **Japão**: https://affiliate.amazon.co.jp/help

---

## 🎉 Resumo Rápido

1. ✅ **Registre-se** em cada programa de afiliados Amazon
2. ✅ **Obtenha suas tags** após aprovação
3. ✅ **Atualize o arquivo** `amazonMarketplaces.ts`
4. ✅ **Faça build e deploy**
5. ✅ **Comece a ganhar dinheiro** em 14 países!

**Seu site está pronto!** Agora é só se registrar nos programas e começar a promover! 💰🚀
