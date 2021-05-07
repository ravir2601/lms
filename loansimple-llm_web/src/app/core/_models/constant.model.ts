export class Constant {
    name: string;
    value: string;
}

export class BusinessVertical {
    id: number;
    name: string;
}

export class BusinessCategory {
    id: number;
    business_vertical: number;
    business_model: string;
    name: string;
    min_margin: number;
    max_margin: number;
}
