import { ThreadLikeVisibility } from './thread_like_visibility';
import { LikeVisibility } from './like_visibility';
import { AppCommentLikeVisibility } from './app_comment_like_visibility';

const registVisibilityObserver = (root: Document, target: HTMLElement, visibility: LikeVisibility) => {
    const hideLikeContsObserver = new MutationObserver(visibility.hideLikeConts.bind(this, root));
    hideLikeContsObserver.observe(target, {childList: true, subtree: true});
    const visibleLiketoClickedObserver = new MutationObserver(visibility.visibleLikeToClicked.bind(this, root));
    visibleLiketoClickedObserver.observe(target, {childList: true, subtree: true});
}

const registVisibilityObserverInIframe = () => {
    const iframe = document.getElementById('notification-iframe-gaia') as HTMLIFrameElement;
    const iframeDocument = iframe.contentDocument;

    if (iframeDocument.body) {
        const visibility = new AppCommentLikeVisibility();
        registVisibilityObserver(iframeDocument, iframeDocument.body, visibility);
    }
}

const addObserverIfDesiredNodeAvailable = () => {
    const contentBody = document.getElementById('contents-body-ocean');
    if (contentBody) {
        const visibility = new ThreadLikeVisibility();
        visibility.hideLikeConts(document);
        visibility.visibleLikeToClicked(document);
        registVisibilityObserver(document, contentBody, visibility);
        const observer = new MutationObserver(registVisibilityObserverInIframe);
        observer.observe(contentBody, {attributes: true, childList: true, subtree: true, attributeFilter: ['style']});

    }

    const sideBarContent = document.querySelector('.gaia-argoui-app-show-sidebar-content') as HTMLElement;
    if (sideBarContent) {
        const visibility = new AppCommentLikeVisibility();
        visibility.hideLikeConts(document);
        visibility.visibleLikeToClicked(document);
        registVisibilityObserver(document, sideBarContent, visibility);
    }
};

addObserverIfDesiredNodeAvailable();
