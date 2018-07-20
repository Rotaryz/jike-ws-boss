// 将所有的接口请求都通过这个统一输出
import jwt from './jwt'
import clientDetail from './clientDetail'
import echart from './echart'
import rank from './rank'
import analyse from './ai-analyse'
import client from './client'
import business from './business'
import member from './member'
import product from './product'
import activity from './activity'

// 授权模块
export const Jwt = jwt

// 名片
export const Business = business

// 客户资料
export const ClientDetail = clientDetail

// 图表
export const Echart = echart

// 排行榜
export const Rank = rank

// ai分析
export const Analyse = analyse

// 客户
export const Client = client

// 用户
export const Member = member

// 用户
export const Product = product

// 活动
export const Activity = activity
