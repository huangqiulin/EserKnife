package com.ucar.eser.core.jest.vo;

import java.util.List;

/**
 *
 * Description: 查询索引别名结果集
 * All Rights Reserved.
 * Created on 2016-7-22 下午4:27:56
 */
public class SearchAliasReslut {
    /**
     * 索引名称
     */
    private String index;
    /**
     * 索引下的所有别名信息
     */
    private List<AliasInfo> aliases;

    public SearchAliasReslut (String index) {
        this.index = index;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public List<AliasInfo> getAliases() {
        return aliases;
    }

    public void setAliases(List<AliasInfo> aliases) {
        this.aliases = aliases;
    }

    @Override
    public String toString() {
        return "SearchAliasReslut [index=" + index + ", aliases=" + aliases
                + "]";
    }

}
