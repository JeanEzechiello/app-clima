let cidade = document.getElementById('town')
let busca = document.getElementById('search')
let city = document.getElementById('cidade')
let icone = document.getElementById('icone')
let temp = document.getElementById('temperatura')
let desc = document.getElementById('descricao')
let res = document.getElementById('res')

async function buscarClima() {
    let nomeCidade = cidade.value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${nomeCidade}&appid=d2a55e77bcb934ef7a6b6cb963a593c1&units=metric&lang=pt_br`

    let resposta = await fetch(url)
    let dados = await resposta.json()

    if(dados.cod !== 200) {
        city.textContent = "Ops! Não encontramos essa cidade no céu 🌥️"
        temp.textContent = ''
        desc.textContent = ''
    } else {
        city.textContent = dados.name
        icone.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`

        temp.textContent = dados.main.temp
        desc.textContent = dados.weather[0].description
    }  
}

busca.addEventListener('click', buscarClima)

cidade.addEventListener('keydown', function(event){
    if(event.key === "Enter") {
        buscarClima()
    }
});