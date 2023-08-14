package md.utm.farmBot.servicecore.dto;

import org.springframework.data.domain.Page;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class SearchResult<T> {
    private List<T> content;
    private long totalElements;
    private int pageNumber;
    private int pageSize;
    private boolean last;

    public SearchResult(Page<T> page) {
        this.content = page.getContent();
        this.pageNumber = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.last = page.isLast();
        this.totalElements = page.getTotalElements();
    }

    public <R> SearchResult(Page<R> page, Function<R, T> mapper) {
        this.content = (List)page.getContent().stream().map(mapper).collect(Collectors.toList());
        this.pageNumber = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.last = page.isLast();
        this.totalElements = page.getTotalElements();
    }

    public SearchResult(List<T> values) {
        this.content = values;
        this.pageNumber = 1;
        this.pageSize = Integer.MAX_VALUE;
        this.last = true;
        this.totalElements = (long)values.size();
    }

    public SearchResult(final List<T> content, final long totalElements, final int pageNumber, final int pageSize, final boolean last) {
        this.content = content;
        this.totalElements = totalElements;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.last = last;
    }

    public SearchResult() {
    }

    public List<T> getContent() {
        return this.content;
    }

    public long getTotalElements() {
        return this.totalElements;
    }

    public int getPageNumber() {
        return this.pageNumber;
    }

    public int getPageSize() {
        return this.pageSize;
    }

    public boolean isLast() {
        return this.last;
    }

    public void setContent(final List<T> content) {
        this.content = content;
    }

    public void setTotalElements(final long totalElements) {
        this.totalElements = totalElements;
    }

    public void setPageNumber(final int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public void setPageSize(final int pageSize) {
        this.pageSize = pageSize;
    }

    public void setLast(final boolean last) {
        this.last = last;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof SearchResult)) {
            return false;
        } else {
            SearchResult<?> other = (SearchResult)o;
            if (!other.canEqual(this)) {
                return false;
            } else if (this.getTotalElements() != other.getTotalElements()) {
                return false;
            } else if (this.getPageNumber() != other.getPageNumber()) {
                return false;
            } else if (this.getPageSize() != other.getPageSize()) {
                return false;
            } else if (this.isLast() != other.isLast()) {
                return false;
            } else {
                Object this$content = this.getContent();
                Object other$content = other.getContent();
                if (this$content == null) {
                    if (other$content != null) {
                        return false;
                    }
                } else if (!this$content.equals(other$content)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof SearchResult;
    }

    public int hashCode() {
        int result = 1;
        long $totalElements = this.getTotalElements();
        result = result * 59 + (int)($totalElements >>> 32 ^ $totalElements);
        result = result * 59 + this.getPageNumber();
        result = result * 59 + this.getPageSize();
        result = result * 59 + (this.isLast() ? 79 : 97);
        Object $content = this.getContent();
        result = result * 59 + ($content == null ? 43 : $content.hashCode());
        return result;
    }

    public String toString() {
        List var = this.getContent();
        return "SearchResult(content=" + var + ", totalElements=" + this.getTotalElements() + ", pageNumber=" + this.getPageNumber() + ", pageSize=" + this.getPageSize() + ", last=" + this.isLast() + ")";
    }
}