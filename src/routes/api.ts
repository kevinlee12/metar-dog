import type { RequestHandler } from '@sveltejs/kit';
import fetch from 'node-fetch';
import { parse, X2jOptions } from 'fast-xml-parser';

export const get: RequestHandler = async (request) => {
	const icaoCode: string = request.query.get('icao');

	if (icaoCode == null || icaoCode.search(/[A-Z]{4}/)) {
		return {
			status: 404,
			body: 'Invalid ICAO code'
		};
	}

	const urlPattern =
		'https://www.aviationweather.gov/adds/dataserver_current/' +
		'httpparam?dataSource=metars&requestType=retrieve&format=xml&' +
		'stationString=<airport>&hoursBeforeNow=1&mostRecent=true';
	const url = urlPattern.replace('<airport>', icaoCode);

	const response = await fetch(url);
	const body = await response.text();

	const optionOverrides: Partial<X2jOptions> = {
		attributeNamePrefix: '',
		ignoreAttributes: false
	};
	const data = parse(body, optionOverrides);

	return {
		body: data.response.data.METAR
	};
};
