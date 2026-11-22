import OriginalComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import MegaMenuNavbarItem from './MegaMenuNavbarItem';

// 注册 custom-megaMenu 类型，供 docusaurus.config.js 的导航栏使用
export default {
  ...OriginalComponentTypes,
  'custom-megaMenu': MegaMenuNavbarItem,
};
