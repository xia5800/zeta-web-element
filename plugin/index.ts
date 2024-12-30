import type { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { vitePluginFakeServer } from 'vite-plugin-fake-server'
import RemoveConsole from 'vite-plugin-remove-console'

/**
 * 创建vite插件
 * @return
 */
export function createVitePlugins(viteEnv: ViteEnv, _command: string) {
  const { VITE_USE_MOCK, VITE_DROP_CONSOLE, VITE_VISUALIZER } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
  ]

  // 自定义组件名字支持
  vitePlugins.push(DefineOptions())

  // 按需自动导入Api
  vitePlugins.push(configAutoImport())

  // 按需自动导入组件
  vitePlugins.push(configComponents())

  // 按需自动导入图标
  vitePlugins.push(configIcons())

  // mock服务
  vitePlugins.push(configMockServer(VITE_USE_MOCK === 'true'))

  // 打包文件分析
  vitePlugins.push(configVisualizer(VITE_VISUALIZER === 'true'))

  // 线上环境删除console输出
  vitePlugins.push(configRemoveConsole(VITE_DROP_CONSOLE === 'true'))

  return vitePlugins
}

/** 按需自动导入Api 插件配置 */
function configAutoImport() {
  return AutoImport({
    dts: 'src/auto-imports.d.ts',
    resolvers: [
      ElementPlusResolver(),
      // 自动导入图标组件
      IconsResolver({
        prefix: 'Icon',
      }),
    ],
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'pinia',
    ],
    dirs: [
      'src/api/**',
      'src/hooks',
      'src/store/**',
    ],
    vueTemplate: true,
  })
}

/** 按需自动导入组件 插件配置 */
function configComponents() {
  return Components({
    dts: 'src/components.d.ts',
    resolvers: [
      ElementPlusResolver(),
      // 自动注册图标组件
      IconsResolver({
        // 解析的图标库有: element-plus、Material Design Icons. 除此之外的都不解析
        enabledCollections: ['ep', 'mdi'],
      }),
    ],
  })
}

/** 按需自动导入图标 插件配置 */
function configIcons() {
  return Icons({
    // 自动安装图标, 改成false则使用本地的图标，例如："@iconify-json/ep"、"@iconify-json/mdi"
    autoInstall: false,
  })
}

/** Mock服务 */
function configMockServer(open: boolean) {
  return vitePluginFakeServer({
    enableProd: open,
    enableDev: open,
    include: 'mock',
    build: false,
    infixName: false,
    logger: false,
  })
}

/** 打包文件分析配置 */
function configVisualizer(open: boolean) {
  return visualizer({
    open,
    brotliSize: true,
    gzipSize: true,
    filename: 'report.html',
  }) as PluginOption
}

/** 配置移除console输出 */
function configRemoveConsole(open: boolean) {
  return open ? RemoveConsole() : []
}