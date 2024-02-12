export default function hex2a(hex: string | undefined): string {
    let str = '';
    if (hex) {
        for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
    }
    return str;
}
