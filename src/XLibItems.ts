// class decorator ktory nastavuje property entity (dalo by sa to nastavovat v konstruktore ale decorator je menej ukecany)
// ma sa pouzivat len na triedach odvodenych od XFormBase - obmedzenie som vsak nevedel nakodit
// property sa nastavi az po zbehnuti konstruktora
// decorator je sem nakopirovany, lebo ak sa pouzije decorator z lib-ky, tak nezafunguje
export function Form(entity: string) {
    // sem (mozno) moze prist registracia formu-u
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            entity = entity;
        }
    }
}
