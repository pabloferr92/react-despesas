export function helperSetTotalDespesas(totalDespesas) {
    console.log("tipo " + typeof(totalDespesas))
    document.getElementById("despesasTotal").innerHTML = "Despesas total: R$ " + parseFloat(totalDespesas).toFixed(2).toLocaleString("pt");
  }
  