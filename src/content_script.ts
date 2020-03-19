import { ThreadLikeVisibility } from './thread_like_visibility';
import { LikeVisibility } from './like_visibility';
import { AppCommentLikeVisibility } from './app_comment_like_visibility';

const registVisibilityObserver = (target: HTMLElement, visibility: LikeVisibility) => {
    const hideLikeContsObserver = new MutationObserver(visibility.hideLikeConts.bind(visibility));
    hideLikeContsObserver.observe(target, {childList: true, subtree: true});
    const visibleLiketoClickedObserver = new MutationObserver(visibility.visibleLikeToClicked.bind(visibility));
    visibleLiketoClickedObserver.observe(target, {childList: true, subtree: true});
}

const addObserverIfDesiredNodeAvailable = () => {
    const contentBody = document.getElementById('contents-body-ocean');
    if (contentBody) {
        registVisibilityObserver(contentBody, new ThreadLikeVisibility(document));
    }

    const sideBarContent = document.querySelector('.gaia-argoui-app-show-sidebar-content') as HTMLElement;
    if (sideBarContent) {
        registVisibilityObserver(sideBarContent, new AppCommentLikeVisibility(document));
    }
};

addObserverIfDesiredNodeAvailable();
