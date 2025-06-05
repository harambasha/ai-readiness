declare module '@mailchimp/mailchimp_marketing' {
  interface CampaignCreateOptions {
    type: string;
    recipients: {
      list_id: string;
      segment_opts?: {
        saved_segment_id: number;
      };
    };
    settings: {
      subject_line: string;
      from_name: string;
      reply_to: string;
      auto_footer: boolean;
    };
  }

  interface CampaignContent {
    html: string;
  }

  interface Campaign {
    id: string;
  }

  const mailchimp: {
    setConfig: (config: { apiKey: string; server: string }) => void;
    campaigns: {
      create: (options: CampaignCreateOptions) => Promise<Campaign>;
      setContent: (campaignId: string, content: CampaignContent) => Promise<void>;
      send: (campaignId: string) => Promise<void>;
    };
  };

  export default mailchimp;
} 