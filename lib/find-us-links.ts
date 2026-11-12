// Find Us Online — centralized link data for /find-us.
//
// SINGLE SOURCE OF TRUTH: every profile link on the /find-us page comes
// from this file. To add, edit or remove a profile, edit only this file —
// no other file hardcodes a profile URL.
//
// HARD RULE: only include a platform here when LocalePak has a real,
// verified public profile on it. Source of truth for verification is the
// workbook `~/workspace/your_files/localepak-backlinks/LocalePak
// Backlinks.xlsx`, sheet "Live Backlinks" — Status = Live only (99 live
// as of 2026-11-11). Submitted-pending platforms (Gust, LinkCentre,
// Startup Fame, PeekLaunch, Fazier, MicroSaaS, SaaS Discovery, etc.) and
// "Not counted" pages with no clickable link (e.g. Muslim Yellow Pages,
// Tupalo) must NOT be added here. Never invent, guess or placeholder a URL.
// The founder's personal LinkedIn is NOT a company profile — do not add it.

export type FindUsCategoryId =
  | 'social'
  | 'directories'
  | 'listings'
  | 'other'

export interface FindUsLink {
  /** Display name of the platform, as shown on the card. */
  name: string
  /** Exact verified public profile URL (copied verbatim from the workbook). */
  url: string
  /** One short, factual sentence about the profile. No invented facts. */
  description: string
}

export interface FindUsCategory {
  id: FindUsCategoryId
  /** H2 heading rendered on the page. */
  title: string
  /** Short intro line rendered under the H2. */
  description: string
  links: FindUsLink[]
}

export const FIND_US_CATEGORIES: FindUsCategory[] = [
  {
    id: 'social',
    title: 'Social Media Profiles',
    description:
      'Follow LocalePak on social networks and link-in-bio pages — every profile below links back to localepak.com.',
    links: [
      {
        name: 'Mastodon',
        url: 'https://mastodon.social/@localepak',
        description:
          'LocalePak’s official profile on Mastodon, with our website link in the profile.',
      },
      {
        name: 'Tumblr',
        url: 'https://www.tumblr.com/localepak',
        description:
          'LocalePak’s official Tumblr blog, including a public link post to localepak.com.',
      },
      {
        name: 'Reddit',
        url: 'https://www.reddit.com/user/localepak/',
        description:
          'LocalePak’s official Reddit profile, with a social link to localepak.com.',
      },
      {
        name: 'Quora',
        url: 'https://www.quora.com/profile/LocalePak',
        description:
          'LocalePak’s official Quora profile, linking to the LocalePak business directory.',
      },
      {
        name: 'Medium',
        url: 'https://medium.com/@support_69864',
        description:
          'LocalePak’s official Medium profile, with a link to localepak.com in the About page.',
      },
      {
        name: 'Substack',
        url: 'https://localepak.substack.com/',
        description:
          'LocalePak’s official Substack publication, with a website link to localepak.com.',
      },
      {
        name: 'Disqus',
        url: 'https://disqus.com/by/localepak/',
        description:
          'LocalePak’s official Disqus profile, with a website link to localepak.com.',
      },
      {
        name: 'Linktree',
        url: 'https://linktr.ee/localepak',
        description:
          'LocalePak’s official Linktree page — one tap to reach localepak.com.',
      },
      {
        name: 'Lnk.Bio',
        url: 'https://lnk.bio/localepak',
        description:
          'LocalePak’s official Lnk.Bio page, linking directly to localepak.com.',
      },
      {
        name: 'Carrd',
        url: 'https://localepak.carrd.co/',
        description:
          'LocalePak’s official Carrd landing page, with a link to localepak.com.',
      },
      {
        name: 'Paage',
        url: 'https://paa.ge/localepak',
        description:
          'LocalePak’s official Paage link-in-bio page, linking to localepak.com.',
      },
      {
        name: 'Bio Sites',
        url: 'https://bio.site/localepak',
        description:
          'LocalePak’s official Bio Sites page (by Squarespace), linking to localepak.com.',
      },
      {
        name: 'lit.bio',
        url: 'https://lit.bio/localepak',
        description:
          'LocalePak’s official lit.bio page, linking directly to localepak.com.',
      },
      {
        name: 'Campsite.bio',
        url: 'https://campsite.bio/localepak',
        description:
          'LocalePak’s official Campsite.bio page, linking to localepak.com.',
      },
      {
        name: 'Taplink',
        url: 'https://taplink.cc/localepak',
        description:
          'LocalePak’s official Taplink page, linking directly to localepak.com.',
      },
      {
        name: 'Bravely',
        url: 'https://bravely.link/localepak',
        description:
          'LocalePak’s official Bravely link-in-bio page, linking to localepak.com.',
      },
      {
        name: 'AllMyLinks',
        url: 'https://allmylinks.com/localepak',
        description:
          'LocalePak’s official AllMyLinks page, linking directly to localepak.com.',
      },
      {
        name: 'Direct.me',
        url: 'https://direct.me/localepak',
        description:
          'LocalePak’s official Direct.me page, linking directly to localepak.com.',
      },
      {
        name: 'Zaap',
        url: 'https://zaap.bio/localepak',
        description:
          'LocalePak’s official Zaap link-in-bio page, linking to localepak.com.',
      },
      {
        name: 'Liink',
        url: 'https://liink.is/localepak',
        description:
          'LocalePak’s official Liink page, linking directly to localepak.com.',
      },
      {
        name: 'solo.to',
        url: 'https://solo.to/localepak',
        description:
          'LocalePak’s official solo.to page, linking directly to localepak.com.',
      },
      {
        name: 'atom.bio',
        url: 'https://www.atom.bio/localepak',
        description:
          'LocalePak’s official atom.bio page, linking directly to localepak.com.',
      },
      {
        name: 'SOCIA TAP',
        url: 'https://sociatap.com/localepak/',
        description:
          'LocalePak’s official SOCIA TAP page, linking directly to localepak.com.',
      },
      {
        name: 'Flipboard',
        url: 'https://flipboard.com/@localepak/pakistan-business-directory-3a5olddgy',
        description:
          'LocalePak’s Flipboard magazine, with stories linking to live pages on localepak.com.',
      },
      {
        name: 'hoo.be',
        url: 'https://hoo.be/localepak',
        description:
          'LocalePak’s official hoo.be page, linking directly to localepak.com.',
      },
      {
        name: 'OnlyLinks',
        url: 'https://www.onlylinks.io/localepak',
        description:
          'LocalePak’s official OnlyLinks page, linking directly to localepak.com.',
      },
      {
        name: 'soc.bio',
        url: 'https://soc.bio/localepak',
        description:
          'LocalePak’s official soc.bio page, linking directly to localepak.com.',
      },
      {
        name: 'in.bio',
        url: 'https://in.bio/localepak',
        description:
          'LocalePak’s official in.bio page, linking directly to localepak.com.',
      },
      {
        name: 'Linkme.bio',
        url: 'https://linkme.bio/localepak',
        description:
          'LocalePak’s official Linkme.bio page, linking directly to localepak.com.',
      },
      {
        name: 'Linkie',
        url: 'https://linkie.bio/localepak',
        description:
          'LocalePak’s official Linkie page, linking directly to localepak.com.',
      },
      {
        name: 'Link.me',
        url: 'https://link.me/localepak',
        description:
          'LocalePak’s official Link.me page, linking directly to localepak.com.',
      },
      {
        name: 'Hugging Face',
        url: 'https://huggingface.co/localepak',
        description:
          'LocalePak’s official Hugging Face profile, linking directly to localepak.com.',
      },
      {
        name: 'whomi.bio',
        url: 'https://whomi.bio/localepak',
        description:
          'LocalePak’s official whomi.bio page, linking directly to localepak.com.',
      },
      {
        name: 'Bitbucket',
        url: 'https://bitbucket.org/localepak/',
        description:
          'LocalePak’s official Bitbucket workspace, linking directly to localepak.com.',
      },
    ],
  },
  {
    id: 'directories',
    title: 'Business Directories',
    description:
      'LocalePak’s verified listings in business directories across Pakistan and worldwide.',
    links: [
      {
        name: 'Hotfrog',
        url: 'https://www.hotfrog.com/company/AaFxYHsbc2yCHlmiPfOwCA/localepak/islamabad/internet',
        description:
          'LocalePak’s verified Hotfrog business listing in Islamabad, with our address, phone and website.',
      },
      {
        name: 'Brownbook',
        url: 'https://www.brownbook.net/business/56027250/localepak',
        description:
          'LocalePak’s claimed Brownbook business listing, with our address, phone and website link.',
      },
      {
        name: 'YellowPage.pk',
        url: 'https://yellowpage.pk/listing/924',
        description:
          'LocalePak’s approved YellowPage.pk directory listing, with a website link to localepak.com.',
      },
      {
        name: 'FirmsDirectory',
        url: 'https://firmsdirectory.com/company/localepak/',
        description:
          'LocalePak’s public FirmsDirectory listing, with a website link to localepak.com.',
      },
      {
        name: 'info.org.pk',
        url: 'https://www.info.org.pk/business/localepak',
        description:
          'LocalePak’s info.org.pk business listing, with our phone, email and website link.',
      },
      {
        name: 'CityKaam',
        url: 'https://citykaam.com/listing/localepak/',
        description:
          'LocalePak’s CityKaam business listing, showing our Islamabad office address and website.',
      },
      {
        name: 'AddonBiz',
        url: 'https://www.addonbiz.com/listing/islamabad-pakistan-localepak/',
        description:
          'LocalePak’s AddonBiz business listing, with our office address, phone and website.',
      },
      {
        name: 'Jayde',
        url: 'https://www.jayde.com/profiles/01898280',
        description:
          'LocalePak’s Jayde business profile, linking to localepak.com.',
      },
    ],
  },
  {
    id: 'listings',
    title: 'Business Listings & Citations',
    description:
      'Review platforms, company listings and citation pages where LocalePak is listed.',
    links: [
      {
        name: 'Trustpilot',
        url: 'https://www.trustpilot.com/review/localepak.com',
        description:
          'LocalePak’s claimed Trustpilot review profile for localepak.com.',
      },
      {
        name: 'SmartCustomer',
        url: 'https://www.smartcustomer.com/reviews/localepak.com',
        description:
          'LocalePak’s claimed SmartCustomer review profile, linking to localepak.com.',
      },
      {
        name: 'Free Range',
        url: 'https://www.freerange.directory/business/localepak',
        description:
          'LocalePak’s Free Range business listing, with our office address, phone and website.',
      },
      {
        name: 'Enterprise League',
        url: 'https://enterpriseleague.com/company/localepak',
        description:
          'LocalePak’s Enterprise League company profile, linking to localepak.com.',
      },
      {
        name: 'TheOrg',
        url: 'https://theorg.com/org/localepak',
        description:
          'LocalePak’s TheOrg company profile, with our Islamabad HQ and a link to localepak.com.',
      },
      {
        name: 'Startup Network PK',
        url: 'https://startupnetwork.pk/listing/localepak/',
        description:
          'LocalePak’s Startup Network PK listing — a Pakistani startup directory — linking to localepak.com.',
      },
      {
        name: 'InnoCollab',
        url: 'https://innocollab.pk/talent/imran-digitals',
        description:
          'LocalePak is featured as a launched startup idea on the Imran Digitals talent profile on InnoCollab, linking to localepak.com.',
      },
    ],
  },
  {
    id: 'other',
    title: 'Other Online Platforms',
    description:
      'Developer communities, startup platforms and launch directories where LocalePak has a verified profile.',
    links: [
      {
        name: 'dev.to',
        url: 'https://dev.to/localepak',
        description:
          'LocalePak’s official dev.to organisation page, linking to localepak.com.',
      },
      {
        name: 'F6S',
        url: 'https://www.f6s.com/localepak',
        description:
          'LocalePak’s F6S startup profile, founded in 2026, linking to localepak.com.',
      },
      {
        name: 'Hashnode',
        url: 'https://hashnode.com/@localepak',
        description:
          'LocalePak’s official Hashnode profile, with a website link to localepak.com.',
      },
      {
        name: 'Gravatar',
        url: 'https://gravatar.com/steadya06d098b74',
        description:
          'LocalePak’s official Gravatar profile, linking to localepak.com.',
      },
      {
        name: 'Wellfound',
        url: 'https://wellfound.com/company/localepak',
        description:
          'LocalePak’s Wellfound company profile, with a website button linking to localepak.com.',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/localepak',
        description:
          'LocalePak’s official GitHub organisation, linking to localepak.com.',
      },
      {
        name: 'WordPress.com',
        url: 'https://localepak.wordpress.com/2026/10/25/localepak/',
        description:
          'LocalePak’s introductory post on WordPress.com, linking to localepak.com.',
      },
      {
        name: 'Peerlist',
        url: 'https://peerlist.io/imrandigitals/project/localepak',
        description:
          'LocalePak’s Peerlist project page, linking to localepak.com.',
      },
      {
        name: 'Tiny Startups',
        url: 'https://www.tinystartups.com/startup/localepak',
        description:
          'LocalePak’s Tiny Startups listing, with a Visit Website link to localepak.com.',
      },
      {
        name: 'TechTools',
        url: 'https://techtools.cz/tools/launchpad/?tool=8756',
        description:
          'LocalePak’s TechTools Launchpad listing, linking to localepak.com.',
      },
      {
        name: 'ProductsFarm',
        url: 'https://productsfarm.com/product/localepak',
        description:
          'LocalePak’s ProductsFarm product page, with a website link to localepak.com.',
      },
      {
        name: 'Free Startup Listing',
        url: 'https://freestartuplisting.org/#directory',
        description:
          'LocalePak’s Free Startup Listing directory card, linking to localepak.com.',
      },
      {
        name: 'IndieTools',
        url: 'https://www.indietools.app/products/localepak',
        description:
          'LocalePak’s IndieTools product page, with a website link to localepak.com.',
      },
      {
        name: 'LetsLaunch',
        url: 'https://letslaunch.today/product/localepak',
        description:
          'LocalePak’s LetsLaunch product page, with a website link to localepak.com.',
      },
      {
        name: 'TryLaunch.ai',
        url: 'https://trylaunch.ai/launch/localepak',
        description:
          'LocalePak’s TryLaunch.ai launch page — free Founder Launch scheduled Nov 12, 2026 — with a website link to localepak.com.',
      },
      {
        name: 'Wix',
        url: 'https://support33083.wixsite.com/localepak',
        description:
          'LocalePak’s free one-page Wix website, linking to localepak.com.',
      },
      {
        name: 'Notion',
        url: 'https://merciful-dryer-458.notion.site/LocalePak-Pakistan-Business-Directory-413d1ddcef5280609aa3e861a3fcd79d',
        description:
          'LocalePak’s public Notion page, indexed by search engines, linking to localepak.com.',
      },
      {
        name: 'Strikingly',
        url: 'https://localepak.mystrikingly.com/',
        description:
          'LocalePak’s free one-page Strikingly website, linking to localepak.com.',
      },
      {
        name: 'Jimdo',
        url: 'https://localepak.jimdosite.com',
        description:
          'LocalePak’s free one-page Jimdo website, linking to localepak.com.',
      },
      {
        name: 'Webflow',
        url: 'https://localepak.webflow.io/',
        description:
          'LocalePak’s free one-page Webflow website, linking to localepak.com.',
      },
      {
        name: 'StatShow',
        url: 'https://www.statshow.com/www/localepak.com/',
        description:
          'StatShow’s public stats page for localepak.com, linking to localepak.com.',
      },
      {
        name: 'Webnode',
        url: 'https://my-website-txwf0c.webnode.page/',
        description:
          'LocalePak’s free one-page Webnode website, linking to localepak.com.',
      },
      {
        name: 'WooRank',
        url: 'https://www.woorank.com/en/teaser-review/localepak.com?usecase=all',
        description:
          'WooRank’s free SEO review page for localepak.com, linking to localepak.com.',
      },
      {
        name: 'Netcraft',
        url: 'https://sitereport.netcraft.com/?url=https://www.localepak.com',
        description:
          'Netcraft’s free site report for localepak.com, linking to localepak.com.',
      },
      {
        name: 'URLRate',
        url: 'https://www.urlrate.com/www/localepak.com',
        description:
          'URLRate’s free worth-rating page for localepak.com, linking to localepak.com.',
      },
      {
        name: 'Be1.ru',
        url: 'https://be1.ru/stat/localepak.com',
        description:
          'Be1.ru’s free stats page for localepak.com, linking to localepak.com.',
      },
      {
        name: 'Speaker Deck',
        url: 'https://speakerdeck.com/localepak',
        description:
          'LocalePak’s free Speaker Deck profile with a published slide deck, linking to localepak.com.',
      },
      {
        name: 'Linklay',
        url: 'https://linklay.io/localepak',
        description:
          'LocalePak’s free Linklay link-in-bio page, linking to localepak.com.',
      },
      {
        name: 'Softr',
        url: 'https://localepak.softr.app/',
        description:
          'LocalePak’s free Softr public page, linking to localepak.com.',
      },
      {
        name: 'Mozello',
        url: 'https://localepak.mozellosite.com',
        description:
          'LocalePak’s free Mozello one-page website, linking to localepak.com.',
      },
      {
        name: 'Readymag',
        url: 'https://readymag.website/u4022795651/localepak/',
        description:
          'LocalePak’s free Readymag one-page website, linking to localepak.com.',
      },
      {
        name: 'Framekit',
        url: 'https://localepak.framekit.ai/',
        description:
          'LocalePak’s free Framekit one-page website, linking to localepak.com.',
      },
      {
        name: 'Pexels',
        url: 'https://www.pexels.com/@localepak-directory-2165605007/',
        description:
          'LocalePak Directory’s free Pexels profile, linking to localepak.com.',
      },
      {
        name: 'WebStarts',
        url: 'https://localepak.yourwebsitespace.com/',
        description:
          'LocalePak’s free WebStarts one-page website, linking to localepak.com.',
      },
      {
        name: 'ora.ai',
        url: 'https://ora.ai/score/localepak.com',
        description:
          'LocalePak’s free ora.ai agent-readiness score page, linking to localepak.com.',
      },
      {
        name: 'Figma',
        url: 'https://www.figma.com/@localepak',
        description:
          'LocalePak’s free Figma Community profile, linking to localepak.com.',
      },
      {
        name: 'Mixo',
        url: 'https://locale-b2cdmn.mixo.io/',
        description:
          'LocalePak’s free Mixo one-page website, linking to localepak.com.',
      },
      {
        name: 'Noiz.bio',
        url: 'https://noiz.bio/localepak',
        description:
          'LocalePak’s free Noiz.bio link-in-bio page, linking to localepak.com.',
      },
      {
        name: 'FindShop.pk',
        url: 'https://findshop.pk/php/priv_business_detail2?id=21',
        description:
          'LocalePak’s free FindShop.pk business listing, linking to localepak.com.',
      },
      {
        name: 'PKEnrollBusiness',
        url: 'https://pk.enrollbusiness.com/BusinessProfile/8041421/LocalePak',
        description:
          'LocalePak’s free PKEnrollBusiness directory listing, linking to localepak.com.',
      },
      {
        name: 'eKatlang',
        url: 'https://ekatlang.com/listing/localepak/',
        description:
          'LocalePak’s free eKatlang business listing, linking to localepak.com.',
      },
      {
        name: 'Contra',
        url: 'https://contra.com/locale_pak',
        description:
          'LocalePak’s free Contra profile, linking to localepak.com.',
      },
      {
        name: 'Issuu',
        url: 'https://issuu.com/localepak',
        description:
          'LocalePak’s free Issuu profile and publication, linking to localepak.com.',
      },
      {
        name: 'Alive Directory',
        url: 'https://www.alive-directory.com/LocalePak_744401.html',
        description:
          'LocalePak’s free Alive Directory listing (Regular Link), linking to localepak.com.',
      },
      {
        name: 'daily.dev',
        url: 'https://daily.dev/localepak',
        description:
          'LocalePak’s free daily.dev profile, linking to localepak.com.',
      },
      {
        name: 'ObservableHQ',
        url: 'https://old.observablehq.com/user/@localepak',
        description:
          'LocalePak’s free Observable profile (legacy page), linking to localepak.com.',
      },
      {
        name: 'SoundCloud',
        url: 'https://soundcloud.com/localepak',
        description:
          'LocalePak’s free SoundCloud profile, linking to localepak.com.',
      },
      {
        name: 'Selfpage',
        url: 'https://localepak.selfpage.me',
        description:
          'LocalePak’s free Selfpage portfolio, linking to localepak.com.',
      },
      {
        name: 'showpage.me',
        url: 'https://www.showpage.me/localepak',
        description:
          'LocalePak’s free showpage.me portfolio, linking to localepak.com.',
      },
      {
        name: 'FolioPage',
        url: 'https://localepak.folio.page/links',
        description:
          'LocalePak’s free FolioPage links page, linking to localepak.com.',
      },
      {
        name: 'MyDevPa.ge',
        url: 'https://mydevpa.ge/localepak',
        description:
          'LocalePak’s free MyDevPa.ge portfolio, linking to localepak.com.',
      },
      {
        name: 'InfoWebWorld',
        url: 'https://www.infowebworld.com/profile/localepak',
        description:
          'LocalePak’s free InfoWebWorld profile, linking to localepak.com.',
      },
    ],
  },
]

/** Total number of verified profiles shown on /find-us. */
export const FIND_US_TOTAL_LINKS = FIND_US_CATEGORIES.reduce(
  (total, category) => total + category.links.length,
  0,
)

/** Flat list of every verified profile URL (used for structured data). */
export const FIND_US_ALL_URLS: string[] = FIND_US_CATEGORIES.flatMap(
  (category) => category.links.map((link) => link.url),
)
