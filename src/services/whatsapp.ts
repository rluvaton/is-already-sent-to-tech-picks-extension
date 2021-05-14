import { expandUrl, isValidHttpUrl } from './utils';

const whatsappChatInventionLinkRegex = /^https?:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9]+)$/;

export function isValidWhatsappChatInvitationLinkUnExpanded(url: string): boolean {
  return whatsappChatInventionLinkRegex.test(url);
}

export async function validateWhatsAppInvitationLink(url: string): Promise<string | undefined> {
  if (!isValidHttpUrl(url)) {
    return undefined;
  }

  if (isValidWhatsappChatInvitationLinkUnExpanded(url)) {
    return url;
  }

  const expandedUrl = await expandUrl(url);

  if (isValidWhatsappChatInvitationLinkUnExpanded(expandedUrl)) {
    return url;
  }
}

export function getWhatsAppDirectInvitationUrlFromRegularInvitationUrl(url: string): string | undefined {
  const whatsAppInvitationCode = url.match(whatsappChatInventionLinkRegex)?.[1];
  return whatsAppInvitationCode ? `https://web.whatsapp.com/accept?code=${whatsAppInvitationCode}` : undefined;
}
