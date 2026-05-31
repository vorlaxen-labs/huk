import { HuK } from '../src';

describe('HuK - ObjectModule', () => {

    test('clone: should create a deep copy and prevent reference sharing', () => {
        const obj = { a: 1, b: { c: 2 } };
        const cloned = HuK.object.clone(obj);

        expect(cloned).toEqual(obj); // Değerler aynı mı?
        expect(cloned).not.toBe(obj); // Farklı bellek adresi mi?
        expect(cloned.b).not.toBe(obj.b); // İç içe obje de kopyalandı mı?
    });

    test('merge: should deep merge two objects', () => {
        const target = { a: 1, b: { c: 2 } };
        const source = { b: { d: 3 } } as any;

        const merged = HuK.object.merge(target, source);

        expect(merged).toEqual({ a: 1, b: { c: 2, d: 3 } });
    });

    test('get: should safely access nested properties with string path', () => {
        const obj = { user: { profile: { name: 'Vorlaxen' } } };

        // Başarılı erişim
        expect(HuK.object.get(obj, 'user.profile.name')).toBe('Vorlaxen');

        // Varsayılan değer (default) kullanımı
        expect(HuK.object.get(obj, 'user.age', 25)).toBe(25);

        // Tanımsız yol
        expect(HuK.object.get(obj, 'settings.theme')).toBeUndefined();
    });

    test('pick: should return a new object with only selected keys', () => {
        const obj = { id: 1, name: 'Test', active: true, hidden: false };
        const picked = HuK.object.pick(obj, ['id', 'active']);

        expect(picked).toEqual({ id: 1, active: true });
        expect(picked).not.toHaveProperty('name');
        expect(picked).not.toHaveProperty('hidden');
    });

});