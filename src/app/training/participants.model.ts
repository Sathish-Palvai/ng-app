export interface Participants {
  id: string;
  partyName: string;
  participantList: ParticipantList[];
}

export interface ParticipantList {
  id: string;
  participantName: string;
  jurisdiction: string;
}
