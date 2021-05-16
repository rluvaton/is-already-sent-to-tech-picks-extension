export  const whatsappChatInventionLinkRegex = /^https?:\/\/chat\.whatsapp\.com\/([a-zA-Z0-9]+)$/;

export function isValidWhatsappChatInvitationLink(url: string): boolean {
  return whatsappChatInventionLinkRegex.test(url);
}

export function getWhatsAppDirectInvitationUrlFromRegularInvitationUrl(url: string): string | undefined {
  const whatsAppInvitationCode = url.match(whatsappChatInventionLinkRegex)?.[1];
  return whatsAppInvitationCode ? `https://web.whatsapp.com/accept?code=${whatsAppInvitationCode}` : undefined;
}
