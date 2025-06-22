const { createApp, ref } = Vue;

createApp({
  setup() {
    const carregarDados = () => {
      const creditoArmazenado = localStorage.getItem("listacredito");
      const debitoArmazenado = localStorage.getItem("listadebito");
      if (creditoArmazenado) {
        listacredito.value = JSON.parse(creditoArmazenado);
      }
      if (debitoArmazenado) {
        listadebito.value = JSON.parse(debitoArmazenado);
      }
    };
    const credito = ref({
      nome: "",
      valor: "",
      parcelas: "",
      data: "",
    });
    const debito = ref({
      nome: "",
      valor: "",
      metodo: "",
      data: "",
    });
    const listacredito = ref([]);
    const listadebito = ref([]);
    const creditoError = ref("");
    const debitoError = ref("");

    //ordenação das listas
    const ordemValorCredito = ref("asc");
    const ordemNomeCredito = ref("asc");
    const ordemDataCredito = ref("asc");
    const ordemParcelasCredito = ref("asc");

    const ordemValorDebito = ref("asc");
    const ordemNomeDebito = ref("asc");
    const ordemDataDebito = ref("asc");

    const formatarData = (dataString) => {
      if (!dataString) return "";
      const date = new Date(dataString);
      return date.toLocaleDateString("pt-BR");
    };

    // Validar campos
    const validarCampos = (dados, tipo = "credito") => {
      if (!dados.nome) return "O campo nome é obrigatório";
      if (!dados.valor) return "O campo valor é obrigatório";
      if (tipo === "credito" && !dados.parcelas)
        return "O campo parcelas é obrigatório";
      if (!dados.data) return "O campo data é obrigatório";
      return "";
    };

    // Adição do crédito
    const addCredito = () => {
      creditoError.value = validarCampos(credito.value);
      if (creditoError.value) return;

      listacredito.value.push({
        nome: credito.value.nome,
        valor: parseFloat(credito.value.valor),
        parcelas: parseInt(credito.value.parcelas),
        data: credito.value.data,
      });
      localStorage.setItem("listacredito", JSON.stringify(listacredito.value));

      credito.value = { nome: "", valor: "", parcelas: "", data: "" };
    };

    // Adição do débito
    const addDebito = () => {
      debitoError.value = validarCampos(debito.value, "debito"); // Adicione o tipo 'debito'
      if (debitoError.value) return;

      listadebito.value = [
        ...listadebito.value,
        {
          nome: debito.value.nome,
          valor: parseFloat(debito.value.valor),
          metodo: debito.value.metodo || "Não especificado", // Certifique-se que está usando debito.metodo
          data: debito.value.data,
        },
      ];

      localStorage.setItem("listadebito", JSON.stringify(listadebito.value));
      debito.value = { nome: "", valor: "", metodo: "", data: "" };
    };
    //ordenação do credito
    const ordenarCreditoPorValor = () => {
      listacredito.value.sort((a, b) => {
        const resultado = a.valor - b.valor;
        return ordemValorCredito.value === "asc" ? resultado : -resultado;
      });
      ordemValorCredito.value =
        ordemValorCredito.value === "asc" ? "desc" : "asc"; // Alternar a ordem
      localStorage.setItem("listacredito", JSON.stringify(listacredito.value));
    };
    const ordenarCreditoPorData = () => {
      listacredito.value.sort((a, b) => new Date(a.data) - new Date(b.data));
      ordemDataCredito.value = "desc"; // Definir como crescente
      localStorage.setItem("listacredito", JSON.stringify(listacredito.value));
    };
    const ordenarCreditoPorNome = () => {
      listacredito.value.sort((a, b) => {
        const resultado = a.nome.localeCompare(b.nome);
        return ordemNomeCredito.value === "asc" ? resultado : -resultado;
      });
      ordemNomeCredito.value =
        ordemNomeCredito.value === "asc" ? "desc" : "asc"; // Alternar a ordem
      localStorage.setItem("listacredito", JSON.stringify(listacredito.value));
    };
    const ordenarCreditoPorParcelas = () => {
      listacredito.value.sort((a, b) => {
        const resultado = a.parcelas - b.parcelas;
        return ordemParcelasCredito.value === "asc" ? resultado : -resultado;
      });
      ordemParcelasCredito.value =
        ordemParcelasCredito.value === "asc" ? "desc" : "asc"; // Alternar a ordem
      localStorage.setItem("listacredito", JSON.stringify(listacredito.value));
    };

    //ordenação do debito
    const ordenarDebitoPorValor = () => {
      listadebito.value.sort((a, b) => {
        const resultado = a.valor - b.valor;
        return ordemValorDebito.value === "asc" ? resultado : -resultado;
      });
      ordemValorDebito.value =
        ordemValorDebito.value === "asc" ? "desc" : "asc"; // Alternar a ordem
      localStorage.setItem("listadebito", JSON.stringify(listadebito.value));
    };
    const ordenarDebitoPorData = () => {
      listadebito.value.sort((a, b) => new Date(a.data) - new Date(b.data));
      ordemDataDebito.value = "desc"; // Definir como crescente
      localStorage.setItem("listadebito", JSON.stringify(listadebito.value));
    };
    const ordenarDebitoPorNome = () => {
      listadebito.value.sort((a, b) => {
        const resultado = a.nome.localeCompare(b.nome);
        return ordemNomeDebito.value === "asc" ? resultado : -resultado;
      });
      ordemNomeDebito.value = ordemNomeDebito.value === "asc" ? "desc" : "asc"; // Alternar a ordem
      localStorage.setItem("listadebito", JSON.stringify(listadebito.value));
    };
    carregarDados();

    return {
      credito,
      debito,
      listacredito,
      listadebito,
      formatarData,
      addCredito,
      addDebito,
      creditoError,
      debitoError,
      ordenarCreditoPorValor,
      ordenarDebitoPorValor,
      ordenarCreditoPorData,
      ordenarDebitoPorData,
      ordenarCreditoPorNome,
      ordenarCreditoPorParcelas,
      ordenarDebitoPorNome,
    };
  },
  methods: {
    irParaResumo() {
      // Adiciona classe de transição
      document.body.classList.add("page-transition");

      // Redireciona após o efeito
      setTimeout(() => {
        window.location.href = "resumo.html";
      }, 100);

      // Ou se estiver usando Vue Router:
      // this.$router.push('/resumo');
    },
  },
}).mount("#app");
