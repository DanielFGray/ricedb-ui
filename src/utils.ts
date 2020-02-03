import { RiceDbEntry } from './react-app-env.d'

export const withoutTimes = ({ last_seen: _l, deadsince: _d, ...x }: RiceDbEntry) => x
export const Contains = (a: string, b: string) => b.toLowerCase().includes(a.toLowerCase())
