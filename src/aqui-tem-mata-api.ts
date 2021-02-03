import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import {
	AreaDeMata,
	BaciaHidro,
	FormacoesNaturais,
	Municipio,
	Municipios,
	TaxaDesmatamentoAnual,
	UC
} from './aqui-tem-mata-api.interface';

/**
 * @name AquiTemMataApi
 * @class
 * @classdesc Este pacote visa buscar informações de desmatamento da Mata Atlântica através dos recursos da API do projeto "Aqui Tem Mata?".
 */

export class AquiTemMataApi {
	private basePath = 'https://sosma.carto.com/api/v2/sql?q=';

	/**
     * @constructor
     * @function
     */
	constructor() {}

	/**
     * @name municipio
     * @function
     * @param {string} text - Nome do município 
     * @param reqOptions - Request options (https://github.com/request/request#requestoptions-callback).
     * @description Busca um município do Brasil.
     */
	municipio(text: string, reqOptions = {}): Observable<RxHttpRequestResponse<Municipios[]>> {
		const query = `SELECT DISTINCT MunicipiosPoligonos.municipio, MunicipiosPoligonos.uf FROM sosma.municipios2013_pop2014 as MunicipiosPoligonos WHERE LOWER(MunicipiosPoligonos.municipio) like '${text.toLowerCase()}'`;
		return RxHR.get(this.basePath + query, { ...reqOptions });
	}

	/**
     * @name areaDeMata
     * @function
     * @param {Municipio} municipio - Nome e UF do município.
     * @param reqOptions - Request options (https://github.com/request/request#requestoptions-callback).
     * @description Busca valores da área total de Mata Atlântica em Km2 e ha.
     */
	areaDeMata(municipio: Municipio, reqOptions = {}): Observable<RxHttpRequestResponse<AreaDeMata[]>> {
		const query = `SELECT total_natural/100 AS area_verde_total_km2, total_natural AS area_verde_total_ha, municipio_na_lei_ma_porcentagem FROM sosma.estats_sos2018_2019_municipios_v4_enviado_arcplan_v4 WHERE LOWER(sosma.estats_sos2018_2019_municipios_v4_enviado_arcplan_v4.municipio) = LOWER('${municipio.municipio}') AND sosma.estats_sos2018_2019_municipios_v4_enviado_arcplan_v4.uf = '${municipio.uf}'`;
		return RxHR.get(this.basePath + query, { ...reqOptions });
	}

	/**
     * @name UCs
     * @function
     * @param {Municipio} municipio - Nome e UF do município.
     * @param reqOptions - Request options (https://github.com/request/request#requestoptions-callback).
     * @description Busca presença em unidades de conservação (UCs).
     */
	UCs(municipio: Municipio, reqOptions = {}): Observable<RxHttpRequestResponse<UC[]>> {
		const query = `SELECT uc.cartodb_id, uc.nome_org12, uc.nome_uc1, uc.esfera5, uc.categori3, uc.ato_lega9, uc.ano_cria6, uc.the_geom_webmercator, ROUND(((ST_Area(uc.the_geom::geography)::numeric)/1000000),2) as area_total_km2, ROUND(((ST_Area(uc.the_geom::geography)::numeric)/10000000000),4) as area_total_ha FROM sosma.ucstodas as uc, sosma.municipios2013_pop2014 as MunicipiosPoligonos WHERE LOWER(MunicipiosPoligonos.municipio) = LOWER('${municipio.municipio}') AND MunicipiosPoligonos.uf = '${municipio.uf}' AND ST_Intersects(uc.the_geom, MunicipiosPoligonos.the_geom)`;
		return RxHR.get(this.basePath + query, { ...reqOptions });
	}

	/**
     * @name baciaHidro
     * @function
     * @param {Municipio} municipio - Nome e UF do município.
     * @param reqOptions - Request options (https://github.com/request/request#requestoptions-callback).
     * @description Busca Localização em bacias hidrográficas.
     */
	baciaHidro(municipio: Municipio, reqOptions = {}): Observable<RxHttpRequestResponse<BaciaHidro[]>> {
		const query = `SELECT rem.cartodb_id, rem.na_vel_1, rem.na_vel_2, rem.na_vel_3, rem.nome, rem.nome_uhr, rem.rio_princ FROM sosma.bacias_ana_nivel03 as rem, sosma.municipios2013_pop2014 as MunicipiosPoligonos WHERE LOWER(MunicipiosPoligonos.municipio) = LOWER('${municipio.municipio}') AND MunicipiosPoligonos.uf = '${municipio.uf}' AND ST_Intersects(rem.the_geom, MunicipiosPoligonos.the_geom)`;
		return RxHR.get(this.basePath + query, { ...reqOptions });
	}

	/**
     * @name formacoesNaturais
     * @function
     * @param {Municipio} municipio - Nome e UF do município.
     * @param reqOptions - Request options (https://github.com/request/request#requestoptions-callback).
     * @description Busca Valores de área (ha) por formação natural.
     */
	formacoesNaturais(municipio: Municipio, reqOptions = {}): Observable<RxHttpRequestResponse<FormacoesNaturais[]>> {
		const query = `SELECT  mata, mata_porcentagem ,mangue, mangue_porcentagem, apicum, campos_naturais, restinga_arborea, restinga_arborea_porcentagem, restinga_herbacea, dunas, total_natural, total_natural_porcentagem, banhados_e_areas_alagadas, refugio, vegetacao_de_varzea, carcinicultura_salinas FROM sosma.estats_sos2018_2019_municipios_v4_enviado_arcplan_v4 where uf='${municipio.uf}' AND LOWER(municipio)=LOWER('${municipio.municipio}')`;
		return RxHR.get(this.basePath + query, { ...reqOptions });
	}

	/**
     * @name TaxaDesmatamentoAnual
     * @function
     * @param {number} anoInicio 
     * @param {number} anoFinal 
     * @param reqOptions - Request options (https://github.com/request/request#requestoptions-callback).
     * @description Busca a taxa de desmatamento por séries anuais.
     */
	taxaDesmatamentoAnual(
		anoInicio: number,
		anoFinal: number,
		reqOptions = {}
	): Observable<RxHttpRequestResponse<TaxaDesmatamentoAnual[]>> {
		const range = `${anoInicio}_${anoFinal}`;
		const query = `SELECT uf, municipio, decremento_de_mata_${range} as decremento FROM sosma.estats_sos2018_2019_municipios_v4_enviado_arcplan_v4 WHERE decremento_de_mata_${range} is not null AND decremento_de_mata_${range} >= 0  ORDER BY decremento_de_mata_${range}`;
		return RxHR.get(this.basePath + query, { ...reqOptions });
	}

	/**
     * @name converteTexto
     * @function
     * @param {string} text - Texto para conversão.
     * @param {boolean} json - Retorno deve ser em JSON ou String.
     * @description Algumas APIs podem retornar com problemas de codificação (encode). Esta função serve para corrigir problemas codificação ISO-8859 para UTF-8.
     */
	converteTexto(text: string, json = false): any {
		const convertedText = decodeURIComponent(escape(text));
		return json ? JSON.parse(convertedText) : convertedText;
	}
}
