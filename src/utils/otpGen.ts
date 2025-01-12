export interface OTPGen {
    generate(): string
}

export class BasicOTPGen implements OTPGen{
    generate(): string {
        return Math.floor(1000 + Math.random() * 999999).toString()
    }
}