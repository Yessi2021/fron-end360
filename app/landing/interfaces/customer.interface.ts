export interface Contact {
    message: string;
    savedUser: SavedUser;
    savedMsg: SavedMsg;
}

export interface Valoration {
    message: string;
    savedUser: SavedUser;
    savedVal: SavedVal;
}

export interface SavedMsg {
    customer: SavedUser;
    createdAt: Date;
    isActive: boolean;
    message: string;
    id: number;
}

export interface SavedUser {
    dateJoined: Date;
    email: string;
    name: string;
    business: string;
    isActive: boolean;
    phone: string;
    phone1: string | null;
    id: number;
}

export interface SavedVal {
    customer: SavedUser;
    createdAt: Date;
    business: string;
    tools: number;
    avaliability: number;
    standars: number;
    management: number;
    level: number;
    id: number;
}

export interface FormVal {
    tools: string;
    standards: string;
    availability: string;
    level: string;
    management: string;
    name: string;
    email: string;
    business: string;
}

export interface FormContact {
    name: string;
    email: string;
    business: string;
    phone: string;
    message: string;
}
