import { LinkType } from "./link-type.enum";

export interface ConfigModel {
    whatsappSentType: LinkType;

    whatsappGroupInvitationLink?: string;
    whatsappGroupDirectInvitationLink?: string;
}