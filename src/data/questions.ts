export type Trait = 'S' | 'C' | 'H' | 'T_Mind' | 'I' | 'R' | 'T_Action' | 'L';

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    trait: Trait;
  }[];
}

export const questions: Question[] = [
  // Axis 1: S vs C (Social vs Cautious)
  {
    id: 1,
    text: '周末好不容易休息，你更倾向于怎么安排？',
    options: [
      { text: '必须约朋友出去嗨，哪怕只是逛个街', trait: 'S' },
      { text: '躺在家里刷手机/追剧，谁也别叫我', trait: 'C' },
    ],
  },
  {
    id: 2,
    text: '在公司/学校的聚餐上，你通常是哪个角色？',
    options: [
      { text: '默默干饭，祈祷别被cue到', trait: 'C' },
      { text: '活跃气氛，跟每一桌都能聊上两句', trait: 'S' },
    ],
  },
  {
    id: 3,
    text: '如果在路上突然被网红博主街访，你的第一反应是？',
    options: [
      { text: '赶紧摆手拒绝，低头快步走开', trait: 'C' },
      { text: '有点小激动，大方接麦回答', trait: 'S' },
    ],
  },
  {
    id: 4,
    text: '刚加入一个新的微信群，你会？',
    options: [
      { text: '发个搞笑表情包打招呼，迅速融入', trait: 'S' },
      { text: '潜水暗中观察，绝不轻易发言', trait: 'C' },
    ],
  },
  {
    id: 5,
    text: '遇到不开心的事，你通常怎么排解？',
    options: [
      { text: '找朋友疯狂吐槽，倒苦水', trait: 'S' },
      { text: '自己一个人静静，消化情绪', trait: 'C' },
    ],
  },

  // Axis 2: H vs T_Mind (Hot-headed vs Thinking)
  {
    id: 6,
    text: '朋友向你疯狂吐槽他的奇葩同事，你会？',
    options: [
      { text: '帮他一起骂，情绪价值给满！', trait: 'H' },
      { text: '帮他分析这个同事为什么奇葩，并给出对策', trait: 'T_Mind' },
    ],
  },
  {
    id: 7,
    text: '看一部很火的催泪电影，你的状态是？',
    options: [
      { text: '分析剧情逻辑，觉得有些地方强行煽情', trait: 'T_Mind' },
      { text: '完全代入角色，跟着哭得稀里哗啦', trait: 'H' },
    ],
  },
  {
    id: 8,
    text: '玩游戏遇到一直送人头的猪队友，你会？',
    options: [
      { text: '气血上涌，直接开麦或打字疯狂互动', trait: 'H' },
      { text: '冷静点个举报，然后默默拉黑', trait: 'T_Mind' },
    ],
  },
  {
    id: 9,
    text: '突然收到前任发来的消息，你的第一反应？',
    options: [
      { text: '心里一惊，立马截图发给闺蜜/兄弟', trait: 'H' },
      { text: '冷静分析对方现在发消息的目的', trait: 'T_Mind' },
    ],
  },
  {
    id: 10,
    text: '买东西发现被商家坑了，你的做法是？',
    options: [
      { text: '气死我了，必须找客服激情对线', trait: 'H' },
      { text: '算算维权成本，如果太麻烦就算了', trait: 'T_Mind' },
    ],
  },

  // Axis 3: I vs R (Imaginative vs Realist)
  {
    id: 11,
    text: '如果突然给你发了一笔意外奖金，你会怎么花？',
    options: [
      { text: '存起来或者用来买一些早就计划好的实用物品', trait: 'R' },
      { text: '买平时觉得贵但超有趣的无用之物，或说走就走', trait: 'I' },
    ],
  },
  {
    id: 12,
    text: '晚上睡不着的时候，你的脑子里通常在想什么？',
    options: [
      { text: '如果我有超能力/中了彩票要干嘛（各种离谱幻想）', trait: 'I' },
      { text: '明天的工作/学习安排，或者盘点今天发生的事', trait: 'R' },
    ],
  },
  {
    id: 13,
    text: '看到路边有个包装奇怪的盲盒机，你会？',
    options: [
      { text: '毫不犹豫买一个看看里面到底是什么鬼', trait: 'I' },
      { text: '肯定是清库存的智商税，看都不看一眼', trait: 'R' },
    ],
  },
  {
    id: 14,
    text: '和朋友聊天时，你最喜欢的话题是？',
    options: [
      { text: '八卦、外星人、玄学、如果...会怎样', trait: 'I' },
      { text: '搞钱、干货、最近的物价和行业动态', trait: 'R' },
    ],
  },
  {
    id: 15,
    text: '对于未来的生活，你的规划风格是？',
    options: [
      { text: '充满各种天马行空的幻想，想到哪算哪', trait: 'I' },
      { text: '一步一个脚印，有明确的短期和长期目标', trait: 'R' },
    ],
  },

  // Axis 4: T_Action vs L (Tough vs Lazy)
  {
    id: 16,
    text: '领导/老师布置了一个全新的任务，你会？',
    options: [
      { text: '立刻拆解目标，马上动手开干', trait: 'T_Action' },
      { text: '先放一边拖着，不到DDL绝对不碰', trait: 'L' },
    ],
  },
  {
    id: 17,
    text: '说好要开始减肥/健身，你的实际行动是？',
    options: [
      { text: '办卡买装备，今天就去健身房挥汗如雨', trait: 'T_Action' },
      { text: '把健身视频放进收藏夹，就等于练过了', trait: 'L' },
    ],
  },
  {
    id: 18,
    text: '面对突如其来的困难挑战，你的态度是？',
    options: [
      { text: '迎难而上，越挫越勇，干就完了', trait: 'T_Action' },
      { text: '只要我滑跪得够快，困难就追不上我', trait: 'L' },
    ],
  },
  {
    id: 19,
    text: '房间变乱了，你会怎么处理？',
    options: [
      { text: '马上进行大扫除，该扔的扔，保持整洁', trait: 'T_Action' },
      { text: '只要床上还有地方躺，就等于不乱', trait: 'L' },
    ],
  },
  {
    id: 20,
    text: '对于现在的“内卷”风气，你怎么看？',
    options: [
      { text: '既然改变不了，那就加入，卷死他们', trait: 'T_Action' },
      { text: '卷是不可能卷的，这辈子都不可能卷', trait: 'L' },
    ],
  },
];
