async function buscarCEP() {
    const uf = document.getElementById('uf').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const logradouro = document.getElementById('logradouro').value.trim();
    const resultadoDiv = document.getElementById('resultado');

    // Validação simples
    if (uf.length !== 2 || cidade.length < 3 || logradouro.length < 3) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    resultadoDiv.innerHTML = "Buscando...";

    try {
        const url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`;
        const response = await fetch(url);
        const dados = await response.json();

        if (dados.length === 0) {
            resultadoDiv.innerHTML = "<p>Nenhum CEP encontrado para este endereço.</p>";
            return;
        }

        // Limpa e exibe os resultados (pode retornar mais de um CEP)
        resultadoDiv.innerHTML = "<h3>Resultados encontrados:</h3>";
        dados.forEach(item => {
            resultadoDiv.innerHTML += `
                <div class="item-cep">
                    <p><strong>CEP:</strong> ${item.cep}</p>
                    <p><strong>Bairro:</strong> ${item.bairro}</p>
                    <p><strong>Logradouro:</strong> ${item.logradouro}</p>
                </div>
            `;
        });

    } catch (error) {
        resultadoDiv.innerHTML = "<p>Erro ao consultar o servidor.</p>";
        console.error(error);
    }
}