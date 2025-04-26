type NewMangaType = {
    href: string;
    type: string;
    thumbnail: string;
    colored: string;
    title: string;
    ep: string;
}

type RecentlyMangaType = {
    href: string;
    type: string;
    thumbnail: string;
    colored: string;
    title: string;
    recentEp: {
        href: string;
        title: string;
        time: string;
    }
}

type MangaDetailType = {
    title: string;
    thumbnail: string;
    followCount: string;
    rating: string;
    description: string;
    detailTable: [string, string][];
    genres: string[];
    chapters: {
        title: string;
        href: string;
        date: string;
    }[];
}

type CommentType = {
    comments: {
        comment: string;
        avatar: string;
        authorName: string;
        date: string;
    }[]
}

type ChapterType = {
    title: string;
    images: string[];
    nextChapter: string;
    prevChapter: string;
}
