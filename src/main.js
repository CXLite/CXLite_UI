import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 1. 引入你需要的组件
import { Button } from 'vant';
import { NavBar } from 'vant';
import { Field } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Tab, Tabs } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Tag } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Card } from 'vant';
import { Image as VanImage } from 'vant';
import { Search } from 'vant';
import { NoticeBar } from 'vant';
import { Sticky } from 'vant';
import { Icon } from 'vant';
import { Progress } from 'vant';
// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App);

// 3. 注册你需要的组件
app.use(Button);
app.use(Field);
app.use(NavBar);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Tab);
app.use(Tabs);
app.use(Collapse);
app.use(CollapseItem);
app.use(Tag);
app.use(Cell);
app.use(CellGroup);
app.use(Card);
app.use(VanImage);
app.use(Search);
app.use(NoticeBar);
app.use(Sticky);
app.use(Icon);
app.use(Progress);

app.mount('#app');