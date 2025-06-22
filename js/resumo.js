/**
 * Obtém os dados de compras do localStorage
 * @returns {Object} Objeto com listas de crédito e débito
 */
function obterDadosCompras() {
  const creditoArmazenado = localStorage.getItem("listacredito");
  const debitoArmazenado = localStorage.getItem("listadebito");

  return {
    listacredito: creditoArmazenado ? JSON.parse(creditoArmazenado) : [],
    listadebito: debitoArmazenado ? JSON.parse(debitoArmazenado) : [],
  };
}

/**
 * Calcula a maior compra (considerando crédito e débito)
 * @returns {Object|null} Objeto com a maior compra ou null se não houver compras
 */
export function calcularMaiorCompra() {
  const { listacredito, listadebito } = obterDadosCompras();
  const todasCompras = [...listacredito, ...listadebito];

  if (todasCompras.length === 0) return null;

  return todasCompras.reduce((maior, compra) => {
    return compra.valor > maior.valor ? compra : maior;
  });
}

/**
 * Calcula a menor compra (considerando crédito e débito)
 * @returns {Object|null} Objeto com a menor compra ou null se não houver compras
 */
export function calcularMenorCompra() {
  const { listacredito, listadebito } = obterDadosCompras();
  const todasCompras = [...listacredito, ...listadebito];

  if (todasCompras.length === 0) return null;

  return todasCompras.reduce((menor, compra) => {
    return compra.valor < menor.valor ? compra : menor;
  });
}

/**
 * Calcula estatísticas de compras por mês
 * @returns {Object} Objeto com estatísticas por mês
 */
export function calcularComprasPorMes() {
  const { listacredito, listadebito } = obterDadosCompras();
  const todasCompras = [...listacredito, ...listadebito];
  const comprasPorMes = {};

  todasCompras.forEach((compra) => {
    const data = new Date(compra.data);
    const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;

    if (!comprasPorMes[mesAno]) {
      comprasPorMes[mesAno] = {
        total: 0,
        quantidade: 0,
        mes: data.toLocaleString("pt-BR", { month: "long", year: "numeric" }),
      };
    }
    comprasPorMes[mesAno].total += compra.valor;
    comprasPorMes[mesAno].quantidade += 1;
  });

  return comprasPorMes;
}

/**
 * Retorna o mês com mais compras
 * @returns {Object} Objeto com informações do mês com mais compras
 */
export function calcularMesMaisCompras() {
  const comprasPorMes = calcularComprasPorMes();
  const meses = Object.values(comprasPorMes);

  if (meses.length === 0) return null;

  return meses.reduce((mesMais, mesAtual) => {
    return mesAtual.quantidade > mesMais.quantidade ? mesAtual : mesMais;
  });
}

/**
 * Retorna o mês com menos compras
 * @returns {Object} Objeto com informações do mês com menos compras
 */
export function calcularMesMenosCompras() {
  const comprasPorMes = calcularComprasPorMes();
  const meses = Object.values(comprasPorMes);

  if (meses.length === 0) return null;

  return meses.reduce((mesMenos, mesAtual) => {
    return mesAtual.quantidade < mesMenos.quantidade ? mesAtual : mesMenos;
  });
}

/**
 * Retorna um resumo completo das análises
 * @returns {Object} Objeto com todas as análises
 */
export function gerarRelatorioAnalitico() {
  return {
    maiorCompra: calcularMaiorCompra(),
    menorCompra: calcularMenorCompra(),
    mesMaisCompras: calcularMesMaisCompras(),
    mesMenosCompras: calcularMesMenosCompras(),
    comprasPorMes: calcularComprasPorMes(),
  };
}
