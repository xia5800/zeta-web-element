export const columns = [
  {
    title: '#',
    type: 'index',
    width: '50px',
    fixed: 'left',
  },
  {
    key: 'triggerState',
    title: '状态',
    minWidth: '80px',
    align: 'center',
    sortable: 'custom',
    fixed: 'left',
    customSlot: 'triggerState',
  },
  {
    key: 'priority',
    title: '触发器优先级',
    minWidth: '140px',
    align: 'center',
    fixed: 'left',
    sortable: 'custom',
    hide: true,
  },
  {
    key: 'jobName',
    title: '任务名',
    width: '200px',
    sortable: 'custom',
    showOverflowTooltip: true,
  },
  {
    key: 'jobDescription',
    title: '任务描述',
    width: '200px',
    showOverflowTooltip: true,
  },
  {
    key: 'triggerType',
    title: '触发器类型',
    minWidth: '360px',
    showOverflowTooltip: true,
    customSlot: 'triggerType',
  },
  {
    key: 'nextFireTime',
    title: '下次触发时间',
    width: '180px',
    showOverflowTooltip: true,
  },
  {
    key: 'prevFireTime',
    title: '上次触发时间',
    width: '180px',
    showOverflowTooltip: true,
  },
  {
    key: 'startTime',
    title: '开始时间',
    width: '160px',
    sortable: 'custom',
    hide: true,
    showOverflowTooltip: true,
  },
  {
    key: 'endTime',
    title: '结束时间',
    width: '160px',
    sortable: 'custom',
    hide: true,
    showOverflowTooltip: true,
  },
  {
    key: 'jobParam',
    title: '任务参数',
    width: '200px',
    showOverflowTooltip: true,
  },
  {
    key: 'jobClass',
    title: '任务执行类',
    width: '140px',
    showOverflowTooltip: true,
    customSlot: 'jobClass',
  },
  {
    key: 'jobClassName',
    title: '类路径',
    width: '400px',
    hide: true,
    showOverflowTooltip: true,
  },
  {
    key: 'operator',
    title: '操作',
    align: 'center',
    width: '180px',
    customSlot: 'operator',
    fixed: 'right',
  },
]
