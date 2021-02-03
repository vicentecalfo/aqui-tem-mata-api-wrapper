export interface Municipios {
	fields?: Municipio;
	rows?: Municipio[];
	time?: number;
	total_rows?: number;
}

export interface FieldType {
	pgtype?: string;
	type?: string;
}

export interface Municipio {
	municipio?: string;
	uf?: string;
}

export interface AreaDeMata {
	fields?: FieldType;
	rows?: AreaVerde[];
	time?: number;
	total_rows?: number;
}

export interface AreaVerde {
	area_verde_total_km2?: number;
	area_verde_total_ha?: number;
	municipio_na_lei_ma_porcentagem?: number;
}

export interface UCs {
	fields?: FieldType;
	rows?: UC[];
	time?: number;
	total_rows?: number;
}

export interface UC {
	ano_cria6?: string;
	area_total_ha?: number;
	area_total_km2?: number;
	ato_lega9?: string;
	cartodb_id?: number;
	categori3?: string;
	esfera5?: string;
	nome_org12?: string;
	nome_uc1?: string;
	the_geom_webmercator?: string;
}

export interface BaciaHidro {
	fields?: FieldType;
	rows?: Bacia[];
	time?: number;
	total_rows?: number;
}

export interface Bacia {
	cartodb_id?: number;
	na_vel_1?: string;
	na_vel_2?: string;
	na_vel_3?: string;
	nome_uhr?: string;
	nome?: string;
	rio_princ?: string;
}

export interface FormacoesNaturais {
	fields?: FieldType;
	rows?: FormacaoNatural[];
	time?: number;
	total_rows?: number;
}

export interface FormacaoNatural {
	apicum?: number;
	banhados_e_areas_alagadas?: number;
	campos_naturais?: number;
	carcinicultura_salinas?: number;
	dunas?: number;
	mangue_porcentagem?: number;
	mangue?: number;
	mata_porcentagem?: number;
	mata?: number;
	refugio?: number;
	restinga_arborea_porcentagem?: number;
	restinga_arborea?: number;
	restinga_herbace?: number;
	total_natural_porcentagem?: number;
	total_natural?: number;
	vegetacao_de_varzea?: number;
}

export interface TaxaDesmatamentoAnual {
	fields?: FieldType;
	rows?: Decremento[];
	time?: number;
	total_rows?: number;
}

export interface Decremento {
	decremento?: number;
	municipio?: string;
	uf?: string;
}
