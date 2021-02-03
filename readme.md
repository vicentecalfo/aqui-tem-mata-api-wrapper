# @vicentecalfo/aqui-tem-mata-api-wrapper

Este pacote visa facilitar a busca de informações de desmatamento da Mata Atlântica através dos recursos da API do projeto "[Aqui Tem Mata?](https://www.aquitemmata.org.br/#/)".

O projeto **Aqui tem Mata?** é um aplicativo para busca de informações sobre a existência de áreas remanescentes de Mata Atlântica no país. Para saber mais, [clique aqui](https://www.aquitemmata.org.br/#/sobre).

## Instalação
`npm install @vicentecalfo/aqui-tem-mata-api-wrapper --save`

## Utilização
```javascript
import { AquiTemMataApi } from '@vicentecalfo/aqui-tem-mata-api-wrapper';

const aquiTemMataApi = new AquiTemMataApi();
// Busca município
aquiTemMataApi
    .municipio('duque de caxias')
    .subscribe(
        (data) => console.log(data.body),
        (error) => console.log(error)
    );

// Busca por área de mata
aquiTemMataApi
	.areaDeMata(
        { municipio: 'Duque de Caxias', uf: 'RJ' }
    )
	.subscribe(
        (data) => console.log(data.body),
        (error) => console.log(error)
    );
```

**Resultado das consultas acima**

Observe que o resultado de fato está na propriedade `rows`. Esta estrutura será a mesma para todos os *endpoints*.
```json
// Resultado para consulta de município
{
	"rows": [{
		"municipio": "Duque de Caxias",
		"uf": "RJ"
	}],
	"time": 0.016,
	"fields": {
		"municipio": {
			"type": "string",
			"pgtype": "text"
		},
		"uf": {
			"type": "string",
			"pgtype": "text"
		}
	},
	"total_rows": 1
}
```
```json
// Resultado para consulta de área de mata
{
	"rows": [{
		"area_verde_total_km2": 162.07575612574,
		"area_verde_total_ha": 16207.575612574,
		"municipio_na_lei_ma_porcentagem": 1.00000000016057
	}],
	"time": 0.005,
	"fields": {
		"area_verde_total_km2": {
			"type": "number",
			"pgtype": "float8"
		},
		"area_verde_total_ha": {
			"type": "number",
			"pgtype": "float8"
		},
		"municipio_na_lei_ma_porcentagem": {
			"type": "number",
			"pgtype": "float8"
		}
	},
	"total_rows": 1
}
```

## Métodos Disponíveis

Todos os métodos podem receber um parâmetro adicional para as requisições HTTP (`reqOptions`). Para verificar todas as opções [clique aqui](https://github.com/request/request#requestoptions-callback).

Os métodos retornam uma `observable`, no entanto você pode usar `promises` também. [Clique aqui](#using-promises) para ver o exemplo.

Método | Parâmetro | Descrição
---|---|---
`municipio(nomeDoMunicipio, reqOptions)` | Nome do município | Busca um município do Brasil.
`areaDeMata(municipio, reqOptions)` | `{ municipio, uf }`| Busca valores da área total de Mata Atlântica em Km2 e ha.
`UCs(municipio, reqOptions)` | `{ municipio, uf }`| Busca presença em unidades de conservação (UCs).
`baciaHidro(municipio, reqOptions)` | `{ municipio, uf }`| Busca Localização em bacias hidrográficas.
`formacoesNaturais(municipio, reqOptions)` | `{ municipio, uf }`| Busca Valores de área (ha) por formação natural.
`taxaDesmatamentoAnual(anoInicio, anoFinal, reqOptions)` | anoInicio (número) e anoFinal(número) | Busca a taxa de desmatamento por séries anuais. **Séries disponíveis até o momento**: 2000~2005, 2005~2008, 2008~2010, 2010~2011, 2011~2012, 2012~2013, 2013~2014, 2014~2015, 2015~2016, 2016~2017, 2017~2018, 2018~2019.
<a id="convert-text"></a>`convertTexto(texto, json)` | Texto (texto com problema de codficação que precisa ser corrigido) e Json (boleano, determina se a saída será em texto ou um objeto JSON) | Corrige problemas de codificação no texto.

## Exemplos
<a id="using-observable"></a>
### Observable
```javascript
import { AquiTemMataApi } from '@vicentecalfo/aqui-tem-mata-api-wrapper';

const aquiTemMataApi = new AquiTemMataApi();

aquiTemMataApi
	.taxaDesmatamentoAnual(
        2018, 
        2019, 
        { json:true } // Faz o parse automático para JSON
    )
	.subscribe(
        (data) => console.log(data.body),
        (error) => console.log(error)
    );
```

<a id="using-promises"></a>
### Promise
```javascript
import { AquiTemMataApi } from '@vicentecalfo/aqui-tem-mata-api-wrapper';

const aquiTemMataApi = new AquiTemMataApi();

aquiTemMataApi
	.UCs(municipio, {json: true})
	.toPromise()
	.then((data) => console.log(data.body))
	.catch((error) => console.log(error));
```

## Codificação de Texto
Até o momento somente o *endpoint* (método) `bacia hidro`, apresentou problemas de codificação (encode). Para resolver o problema você pode usar o método `convertTexto`. Para maiores informações ver [métodos disponíveis](#convert-text).

## Considerações gerais

* Esta **não** é uma ferramenta oficial do projeto "[Aqui tem Mata?](https://www.aquitemmata.org.br/)";
* Não esqueça de ler os [termos de uso](https://www.aquitemmata.org.br/#/termos-de-uso) do "Aqui tem Mata?".