import { LikeVisibility } from './LikeVisibility';

export class ThreadLikeVisibility implements LikeVisibility {
    private root: Document;

    constructor(root: Document) {
        this.root = root;
    }

    public likeClicked(): void {
        const likeBtnEls = this.root.getElementsByClassName(
            'ocean-ui-comments-commentbase-like-count'
        ) as HTMLCollectionOf<HTMLElement>;
        const likeEls = this.root.getElementsByClassName('ocean-ui-comments-commentbase-like') as HTMLCollectionOf<
            HTMLElement
        >;

        for (let i = 0; i < likeEls.length; i++) {
            const likeEl = likeEls.item(i) as HTMLElement;
            if (likeEl.textContent === 'いいね！を取り消す') {
                const likeBtnEl = likeBtnEls.item(i) as HTMLElement;
                likeBtnEl.classList.add('ocean-ui-comments-commentbase-like-count-active');
            }
        }
    }

    public hideLikeCounts(): void {
        const likeCountEls = this.root.getElementsByClassName(
            'ocean-ui-comments-commentbase-like-count-text'
        ) as HTMLCollectionOf<HTMLElement>;
        const likeBtnEls = this.root.getElementsByClassName(
            'ocean-ui-comments-commentbase-like-count'
        ) as HTMLCollectionOf<HTMLElement>;

        for (const el of likeCountEls) {
            el.style.display = 'none';
        }

        for (const el of likeBtnEls) {
            el.classList.remove('ocean-ui-comments-commentbase-like-count-active');
        }
    }
}
