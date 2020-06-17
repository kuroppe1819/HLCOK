import { AppCommentLikeVisibility } from './AppCommentLikeVisibility';
import { LikeVisibility } from './LikeVisibility';
import { ThreadLikeVisibility } from './ThreadLikeVisibility';

const registVisibilityObserver = (target: HTMLElement, visibility: LikeVisibility) => {
    const hideLikeCountsObserver = new MutationObserver(visibility.hideLikeCounts.bind(visibility));
    hideLikeCountsObserver.observe(target, { childList: true, subtree: true });
    const likeClickedObserver = new MutationObserver(visibility.likeClicked.bind(visibility));
    likeClickedObserver.observe(target, { childList: true, subtree: true });
};

const addObserverIfDesiredNodeAvailable = () => {
    const contentBody = document.getElementById('contents-body-ocean');
    if (contentBody) {
        registVisibilityObserver(document.documentElement, new ThreadLikeVisibility(document));
    }

    const sideBarContent = document.querySelector('.gaia-argoui-app-show-sidebar') as HTMLElement;
    if (sideBarContent) {
        registVisibilityObserver(document.documentElement, new AppCommentLikeVisibility(document));
    }
};
addObserverIfDesiredNodeAvailable();
