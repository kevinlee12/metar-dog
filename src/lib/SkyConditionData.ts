export class SkyConditionData {
	skyCover: string;
	cloudBaseAgl: number;

	constructor(skyCover: string, cloudBaseAgl: number) {
		this.skyCover = skyCover;
		this.cloudBaseAgl = cloudBaseAgl;
	}
}
