export interface DimensionAnalysis {
  energy: string;
  mindset: string;
  focus: string;
  action: string;
}

export interface FifteenDimensions {
  name: string;
  en: string;
  score: number;
}

export interface ResultData {
  type: string;
  title: string;
  description: string;
  tags: string[];
  dimensions: DimensionAnalysis;
  fifteenDimensions: FifteenDimensions[];
  imageUrl: string;
}

export const getResultData = (type: string): ResultData => {
  const getImageUrl = (seed: string) => `https://api.dicebear.com/9.x/micah/png?seed=${seed}&backgroundColor=f3f4f6`;

  const getDimensions = (t: string): DimensionAnalysis => ({
    energy: t[0] === 'S' ? '社牛 (Social) - 哪里有热闹哪里就有你' : '社恐 (Cautious) - 享受独处，社交极其耗电',
    mindset: t[1] === 'H' ? '情绪驱动 (Hot-headed) - 感情充沛，爱憎分明' : '逻辑驱动 (Thinking) - 绝对理智，没有感情的杀手',
    focus: t[2] === 'I' ? '脑洞大开 (Imaginative) - 思想天马行空，不拘一格' : '现实主义 (Realist) - 只看利益、数据和可行性',
    action: t[3] === 'T' ? '铁血执行 (Tough) - 干就完了，绝不内耗' : '摆烂躺平 (Lazy) - 能坐着绝不站着，主打一个随缘'
  });

  const getFifteenDimensions = (t: string): FifteenDimensions[] => {
    const isS = t[0] === 'S';
    const isH = t[1] === 'H';
    const isI = t[2] === 'I';
    const isTAction = t[3] === 'T';

    const base = (val: boolean, high: number, low: number) => val ? high : low;

    // N-I-S-H-I-Z-H-E-N-D-E-D-A-S-B (你真是个大SB)
    return [
      { name: '本性', en: 'Nature', score: base(isH, 92, 45) },
      { name: '才智', en: 'Intellect', score: base(!isH, 88, 65) },
      { name: '社交', en: 'Social', score: base(isS, 95, 15) },
      { name: '幽默', en: 'Humor', score: base(isI, 85, 40) },
      { name: '操守', en: 'Integrity', score: base(isTAction, 75, 35) },
      { name: '热忱', en: 'Zeal', score: base(isH, 90, 50) },
      { name: '荣誉', en: 'Honor', score: base(!isI, 82, 55) },
      { name: '共情', en: 'Empathy', score: base(isH, 88, 25) },
      { name: '胆量', en: 'Nerve', score: base(isS && isTAction, 95, 45) },
      { name: '自律', en: 'Discipline', score: base(isTAction, 92, 10) },
      { name: '自我', en: 'Ego', score: base(!isS, 85, 60) },
      { name: '驱动', en: 'Drive', score: base(isTAction, 90, 25) },
      { name: '敏捷', en: 'Agility', score: base(isI, 80, 65) },
      { name: '耐力', en: 'Stamina', score: base(isTAction, 88, 30) },
      { name: '勇气', en: 'Bravery', score: base(isH && isTAction, 94, 55) },
    ];
  };

  const baseData: Record<string, { title: string; description: string; tags: string[] }> = {
    SHIT: { title: '愤世战斗机', description: '你是一个精力旺盛、充满脑洞的性情中人。遇到不公敢于直接开炮，执行力拉满，是朋友圈里最硬核的显眼包。', tags: ['暴躁老哥', '执行力Max', '脑洞清奇'] },
    SHIL: { title: '气氛组组长', description: '情绪饱满且充满奇思妙想，但一到要动手干活就立刻萎了。你是聚会中的开心果，工作中的拖延症晚期。', tags: ['情绪价值', '重度拖延', '开心果'] },
    SHRT: { title: '暴躁平头哥', description: '极其现实且容易上头，生死看淡不服就干。不仅脾气爆，而且说到做到，绝不哔哔。', tags: ['社会我X哥', '雷厉风行', '惹不起'] },
    SHRL: { title: '嘴炮王者', description: '虽然嘴上输出极其狂躁且句句扎心，但身体却诚实地躺在沙发上。典型的“思想上的巨人，行动上的矮子”。', tags: ['祖安狂人', '键盘王者', '懒癌晚期'] },
    STIT: { title: '脑洞领袖', description: '拥有天马行空的想象力和极强的逻辑分析能力，最可怕的是你还具备超强的执行力，天生的创业者或邪教头子。', tags: ['六边形战士', '创业奇才', '精神领袖'] },
    STIL: { title: '社交摸鱼王', description: '人缘极好，点子极多，脑子转得飞快，但所有的高智商都用来研究如何更优雅地摸鱼和推锅。', tags: ['高智商混子', '甩锅达人', '八面玲珑'] },
    STRT: { title: '社交卷王', description: '现实、理智、执行力爆表，还极其擅长搞人际关系。你是老板最爱的员工，同事眼中的大魔王。', tags: ['卷王之王', '职场永动机', '人脉达人'] },
    STRL: { title: '人间清醒混子', description: '看透了社会的运行规律，拥有极强的逻辑和社交能力，但选择主动躺平。看似混日子，实则稳如老狗。', tags: ['看破红尘', '老油条', '稳中向好'] },
    CHIT: { title: '狂热键盘侠', description: '现实中唯唯诺诺，网络上重拳出击。内心戏极其丰富，遇到自己认定的死理会死磕到底。', tags: ['内心戏超多', '死理狂魔', '隐形刺客'] },
    CHIL: { title: '傲娇社恐', description: '虽然是个社恐，但内心感情极其丰富且脑洞极大。懒得去迎合别人，活在自己丰富多彩的小世界里。', tags: ['二次元', '内心丰富', '重度宅'] },
    CHRT: { title: '孤傲独狼', description: '独来独往，脾气火爆，只看现实不听画大饼。只要是自己认定的目标，就算一个人也要硬扛到底。', tags: ['独行侠', '人狠话不多', '莫挨老子'] },
    CHRL: { title: '佛系杠精', description: '喜欢在角落里用最现实的理由杠别人，但杠完就跑，绝不亲自下场解决问题，主打一个陪伴式抬杠。', tags: ['杠完就跑', '角落观察者', '随遇而安'] },
    CTIT: { title: '幕后黑手', description: '深居简出，逻辑严密，脑洞极大且具备可怕的执行力。你就像动漫里运筹帷幄的最终BOSS。', tags: ['最终BOSS', '运筹帷幄', '高冷学霸'] },
    CTIL: { title: '躺平思想家', description: '脑子里装满了能改变世界的伟大构想，逻辑自洽，但因为实在太懒，所以这些构想永远停留在脑子里。', tags: ['思想巨人', '哲学家', '床板焊工'] },
    CTRT: { title: '无情打桩机', description: '绝对理智，绝对现实，绝对孤僻，绝对执行。你是一台没有感情的工作机器，只为目标而活。', tags: ['工作机器', '莫得感情', '效率至上'] },
    CTRL: { title: '绝对拿捏者', description: '极其理智的现实主义者，凡事谋定而后动。但在行动上主打一个“非必要不费力”，用最少的精力掌控全局。', tags: ['幕后大佬', '人间清醒', '高效摸鱼'] },
  };

  const data = baseData[type] || baseData['CTRL']; // fallback

  return {
    type,
    ...data,
    dimensions: getDimensions(type),
    fifteenDimensions: getFifteenDimensions(type),
    imageUrl: getImageUrl(type)
  };
};
