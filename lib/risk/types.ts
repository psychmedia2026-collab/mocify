export type RiskLevel="NORMAL"|"MONITOR"|"REVIEW"|"HOLD";
export type RiskSignalCode="STREAM_VELOCITY"|"EXCESSIVE_REPEAT"|"REGULAR_TIMING"|"ACCOUNT_CLUSTER"|"SESSION_DURATION"|"PAYOUT_CHANGE"|"VERIFIED_CAMPAIGN";
export interface StreamRiskEvent{eventId:string;occurredAt:string;trackId:string;artistId:string;accountId?:string;sessionId:string;country?:string;durationSeconds:number;trackDurationSeconds:number;playsByAccountOnTrack24h:number;playsBySession24h:number;artistStreamsLastHour:number;artistBaselineHourly:number;secondsSincePreviousPlay?:number;similarAccountsInCluster?:number;sessionHours24h?:number;verifiedCampaign?:boolean;recentPayoutProfileChange?:boolean;}
export interface RiskSignal{code:RiskSignalCode;points:number;reason:string;value?:number|string;}
export interface RiskAssessment{eventId:string;score:number;level:RiskLevel;signals:RiskSignal[];requiresHumanReview:boolean;payoutPolicy:"ALLOW"|"MONITOR"|"HOLD";assessedAt:string;engineVersion:string;}
