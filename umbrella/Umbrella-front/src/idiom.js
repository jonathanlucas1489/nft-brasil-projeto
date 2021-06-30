import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  en: {
    translation: {
      "Sign up": "Sign up",
      "Home": "Home",
      "Assets": "Assets",
      "Guide": "Guide",
      "Language": "Language",
      "News": "News",
      "Trade with ": "Trade with ",
      "Buys and sell criptocurrencies": "Buys and sell criptocurrencies",
      "Fast and safe": "Fast and safe",
      "Be part of the revolution": "Be part of the revolution",
      "English": "English",
      "Portuguese": "Portuguese",
      "Spanish": "Spanish",
      "Your wallet": "Your wallet",
      "Index Price": "Index Price",
      "24h Change": "24h Change",
      "Hour Change": "Hour Change",
      "Market Cap": "Market Cap",
      "24h Volume": "24h Volume",
      "Balance": "Balance",
      "Size": 'Size',
      "Final Value": "Final Value",
      "Average price": "Average price",
      "Time": "Time",
      "Description": "Description",
      "Order History": "Order History",
      "Symbol": "Símbolo",
      "Last Modify": "Last Modify",
      "Market": "Market",
      "Size in": "Size in" ,
      "Pairs":"Pairs",
      "Last Price": "Last Price",
      "Change": "Change",
      "Trade History": "Trade History",
      "Order not placed": "Order not placed",
      "Order placed": "Order placed",
      "You sold": "You sold",
      "You bought": "You bought",
      "Order value must be greater than 0": "Order value must be greater than 0",
      "Insufficient funds": "Insufficient funds",
      "Hello": "Hello",
      "Trades made": "Trades made",
      "Balance available": "Balance available",
      "Deposit": "Deposit",
      "Account": "Account",
      "Logout": "Logout",
      "Value": "Value",
      "Please check double to make sure": "Please check double to make sure",
      "Deposit History": "Deposit History",
      "Bank Deposit": "Bank Deposit",
      "Credit Card": "Credit Card",
      "Deposit now": "Deposit now"
    }
  },
  pt: {
    translation: {
      "Sign up": "Cadastre-se",
      "Home": "Inicio",
      "Assets": "Ativos",
      "Guide": "Guia",
      "Language": "Idioma",
      "News": "Novidades",
      "Trade with ": "Trade com ",
      "Buys and sell criptocurrencies": "Compre e venda criptomoedas",
      "Fast and safe": "Rápido e seguro",
      "Be part of the revolution": "Faça parte da revolução",
      "English": "Inglês",
      "Portuguese": "Portugues",
      "Spanish": "Espanhol",
      "Your wallet": "Sua carteira",
      "Index Price": "Índice de preço",
      "24h Change": "Variação 24h",
      "1h Change": "Variação 1h",
      "Market Cap": "Cap. Mercado",
      "24h Volume": "Volume 24h",
      "Balance": "Saldo",
      "Size": 'Quantidade',
      "Final Value": "Valor Final",
      "Average price": "Preço Médio",
      "Time": "Tempo",
      "Description": "Descrição",
      "Order History": "Histórico de Ordem",
      "Symbol": "Símbolo",
      "Price": "Preço",
      "Last Modify": "Ultima mudança",
      "Market": "Mercado",
      "Size in": "Quantidade em" ,
      "Buy Now": "Compre agora",
      "Sell Now": "Venda agora",
      "Pairs":"Pares",
      "Last Price": "Último valor",
      "Change": "Variação",
      "Trade History": "Histórico de Trade",
      "Order not placed": "Ordem não efetuada",
      "Order placed": "Ordem efetuada",
      "You sold": "Você vendeu",
      "You bought": "Você comprou",
      "Order value must be greater than 0": "O valor da ordem deve ser maior que 0",
      "Insufficient funds": "Saldo insuficiente",
      "Hello": "Olá",
      "Trades made": "Trades efetuados",
      "Balance available": "Saldo disponível",
      "Deposit": "Depositar",
      "Account": "Perfil",
      "Logout": "Desconectar",
      "Value": "Valor",
      "Please check double to make sure": "Por favor verifique o valor antes de confirmar",
      "Deposit History": "Histórico de depositos",
      "Bank Deposit": "Deposito Bancário",
      "Credit Card": "Cartão de Crédito",
      "Deposit now": "Deposite agora"
    }
  },
  es: {
      translation: {
        "Sign up": "Registar-se",
        "Home": "Inicio",
        "Assets": "Activos",
        "Guide": "Guía",
        "Language": "Idioma", 
        "News": "Noticias",
        "Trade with ": "Trade con ",
        "Buys and sell criptocurrencies": "Compra y vende criptomonedas",
        "Fast and safe": "Rápido y seguro",
        "Be part of the revolution": "Sé parte de la revolución",
        "CurrentLan": "English",
        "English": "Inglés",
        "Portuguese": "Portugués",
        "Spanish": "Español",
        "Your wallet": "Your wallet"
      }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;