export type RiskDataClass="PSEUDONYMOUS_EVENT"|"AGGREGATE"|"RISK_CASE"|"AUDIT";
export interface PersistedRiskEvent{eventId:string;occurredAt:string;type:string;artistId?:string;trackId?:string;accountKey?:string;sessionKey?:string;countryCode?:string;dataClass:"PSEUDONYMOUS_EVENT";expiresAt:string;}
export interface PersistedHourlyAggregate{aggregateId:string;artistId:string;trackId:string;hour:string;qualifiedStreams:number;uniqueAccounts:number;uniqueSessions:number;countries:number;dataClass:"AGGREGATE";}
export interface PersistedRiskCase{caseId:string;createdAt:string;updatedAt:string;artistId:string;trackId?:string;score:number;level:string;status:"OPEN"|"REVIEWING"|"RESOLVED"|"DISMISSED";signalCodes:string[];payoutPolicy:"ALLOW"|"MONITOR"|"HOLD";dataClass:"RISK_CASE";}
export interface AuditRecord{auditId:string;occurredAt:string;actorKey:string;action:string;targetType:string;targetId:string;reason?:string;previousHash:string;recordHash:string;dataClass:"AUDIT";}
export const riskRetentionPolicy={rawPseudonymousEventsDays:30,riskCasesDays:365,auditDays:730,aggregates:"business-retention-policy" as const};
export function expiryFrom(occurredAt:string,days:number){const d=new Date(occurredAt);if(Number.isNaN(d.getTime()))throw new Error("Invalid retention timestamp");d.setUTCDate(d.getUTCDate()+days);return d.toISOString();}
