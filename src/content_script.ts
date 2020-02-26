import { ThreadLikeVisibility } from './thread_like_visibility';
import { LikeVisibility } from './like_visibility';
import { AppCommentLikeVisibility } from './app_comment_like_visibility';

const addObserverIfDesiredNodeAvailable = () => {
    const registObserver = (target: HTMLElement, visibility: LikeVisibility) => {
        const hideLikeContsObserver = new MutationObserver(visibility.hideLikeConts);
        hideLikeContsObserver.observe(target, {childList: true, subtree: true});
        const visibleLiketoClickedObserver = new MutationObserver(visibility.visibleLikeToClicked);
        visibleLiketoClickedObserver.observe(target, {childList: true, subtree: true});
    }

    const contentBody = document.getElementById('contents-body-ocean');
    if (contentBody) {
        const visibility = new ThreadLikeVisibility();
        visibility.hideLikeConts();
        visibility.visibleLikeToClicked();
        registObserver(contentBody, visibility);
    }

    const sideBarContent = document.querySelector('.gaia-argoui-app-show-sidebar-content') as HTMLElement;
    if (sideBarContent) {
        const visibility = new AppCommentLikeVisibility();
        visibility.hideLikeConts();
        visibility.visibleLikeToClicked();
        registObserver(sideBarContent, visibility);
    }
};

addObserverIfDesiredNodeAvailable();
