
/*===Layouts===*/
import NavLayout from './com/Layout/Nav.vue';
import PageLayout from './com/Layout/Page.vue';

/*===Containers===*/
import PageContainer from './com/Container/Page.vue';
import RootContainer from './com/Container/Root.vue';

/*===Menu items===*/
import IconMenuItem from './com/Menu/Item/Icon.vue';
import LinkMenuItem from './com/Menu/Item/Link.vue';
import LogoMenuItem from './com/Menu/Item/Logo.vue';
import ActionMenuItem from './com/Menu/Item/Action.vue';
import DropdownMenuItem from './com/Menu/Item/Dropdown.vue';
import FeedbackMenuItem from './com/Menu/Item/Feedback.vue';
import NotificationsMenuItem from './com/Menu/Item/Notifications.vue';

/*===UI===*/
import Link from './com/Link/Default.vue';
import Sidebar from './com/Sidebar/Default.vue';
import LineChart from './com/Chart/Line.vue';
import DynamicForm from './com/Form/Dynamic.vue';
import ModelViewCard from './com/Card/ModelView.vue';
import AvatarUploader from './com/Uploader/Avatar.vue';


/*===ERRORS===*/
import AccessDenied from './com/ErrorPage/AccessDenied.vue';


const layouts = [
  NavLayout,
  PageLayout
];

const containers = [
  RootContainer,
  PageContainer
];

const menuItems = [
  ActionMenuItem,
  DropdownMenuItem,
  IconMenuItem,
  LinkMenuItem,
  LogoMenuItem,
  FeedbackMenuItem,
  NotificationsMenuItem
];

const commonUiComponents = [
  Link,
  Sidebar,
  LineChart,
  DynamicForm,
  ModelViewCard,
  AvatarUploader
];

const errors = [
  AccessDenied
];

function registerLayouts(locator) {
  layouts.forEach(layout => {
    locator.Component.register(layout, 'layout');
  });
}

function registerContainers(locator) {
  containers.forEach(container => {
    locator.Component.register(container, 'container');
  });
}

function registerMenuItems(locator) {
  menuItems.forEach(menuItem => {
    locator.Component.register(menuItem, 'menuItem');
  });
}

function registerCommonUiComponents(locator) {
  commonUiComponents.forEach(uiCom => {
    locator.Component.register(uiCom, 'common');
  });
}

function registerErrorBlocks(locator) {
  errors.forEach(page => {
    locator.Component.register(page, 'error');
  });
}

export function registerGlobalComponents (locator) {
  registerLayouts(locator);
  registerContainers(locator);
  registerMenuItems(locator);
  registerCommonUiComponents(locator);
  registerErrorBlocks(locator);
}