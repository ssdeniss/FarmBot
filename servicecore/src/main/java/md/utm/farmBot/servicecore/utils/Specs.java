package md.utm.farmBot.servicecore.utils;

import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.utils.Converter;
import net.kaczmarzyk.spring.data.jpa.utils.QueryContext;
import net.kaczmarzyk.spring.data.jpa.web.WebRequestQueryContext;
import net.kaczmarzyk.spring.data.jpa.web.annotation.OnTypeMismatch;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.jpa.domain.Specification;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public final class Specs {
    private Specs() {
    }

    public static <T, V> Specification<T> equal(String path, V value) {
        return new Equal((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> notEqual(String path, V value) {
        return new NotEqual((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> equalIgnoreCase(String path, V value) {
        return new EqualIgnoreCase((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> notEqualIgnoreCase(String path, V value) {
        return new NotEqualIgnoreCase((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> in(String path, Collection<V> values) {
        return new In((QueryContext)null, path, (String[])((List)values.stream().map(Object::toString).collect(Collectors.toList())).toArray(new String[0]), Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> notIn(String path, Collection<V> values) {
        return new NotIn((QueryContext)null, path, (String[])((List)values.stream().map(Object::toString).collect(Collectors.toList())).toArray(new String[0]), Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> between(String path, V start, V end) {
        return new Between((QueryContext)null, path, new String[]{start.toString(), end.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T> Specification<T> startWith(String path, String value) {
        return new StartingWith((QueryContext)null, path, new String[]{value});
    }

    public static <T> Specification<T> startWithIgnoreCase(String path, String value) {
        return new StartingWithIgnoreCase((QueryContext)null, path, new String[]{value});
    }

    public static <T> Specification<T> endWith(String path, String value) {
        return new EndingWith((QueryContext)null, path, new String[]{value});
    }

    public static <T> Specification<T> endWithIgnoreCase(String path, String value) {
        return new EndingWithIgnoreCase((QueryContext)null, path, new String[]{value});
    }

    public static <T, V> Specification<T> lessThan(String path, V value) {
        return new LessThan((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> lessThanOrEqual(String path, V value) {
        return new LessThanOrEqual((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> greaterThan(String path, V value) {
        return new GreaterThan((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> greaterThanOrEqual(String path, V value) {
        return new GreaterThanOrEqual((QueryContext)null, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T> Specification<T> isNull(String path) {
        return new Null((QueryContext)null, path, new String[]{Boolean.TRUE.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T> Specification<T> isNotNull(String path) {
        return new NotNull((QueryContext)null, path, new String[]{Boolean.TRUE.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> equal(String path, V value, WebRequestQueryContext queryContext) {
        return new Equal(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> notEqual(String path, V value, WebRequestQueryContext queryContext) {
        return new NotEqual(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> equalIgnoreCase(String path, V value, WebRequestQueryContext queryContext) {
        return new EqualIgnoreCase(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> notEqualIgnoreCase(String path, V value, WebRequestQueryContext queryContext) {
        return new NotEqualIgnoreCase(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> in(String path, Collection<V> values, WebRequestQueryContext queryContext) {
        return new In(queryContext, path, (String[])((List)values.stream().map(Object::toString).collect(Collectors.toList())).toArray(new String[0]), Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> notIn(String path, Collection<V> values, WebRequestQueryContext queryContext) {
        return new NotIn(queryContext, path, (String[])((List)values.stream().map(Object::toString).collect(Collectors.toList())).toArray(new String[0]), Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> between(String path, V start, V end, WebRequestQueryContext queryContext) {
        return new Between(queryContext, path, new String[]{start.toString(), end.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T> Specification<T> startWith(String path, String value, WebRequestQueryContext queryContext) {
        return new StartingWith(queryContext, path, new String[]{value});
    }

    public static <T> Specification<T> startWithIgnoreCase(String path, String value, WebRequestQueryContext queryContext) {
        return new StartingWithIgnoreCase(queryContext, path, new String[]{value});
    }

    public static <T> Specification<T> endWith(String path, String value, WebRequestQueryContext queryContext) {
        return new EndingWith(queryContext, path, new String[]{value});
    }

    public static <T> Specification<T> endWithIgnoreCase(String path, String value, WebRequestQueryContext queryContext) {
        return new EndingWithIgnoreCase(queryContext, path, new String[]{value});
    }

    public static <T, V> Specification<T> lessThan(String path, V value, WebRequestQueryContext queryContext) {
        return new LessThan(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> lessThanOrEqual(String path, V value, WebRequestQueryContext queryContext) {
        return new LessThanOrEqual(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> greaterThan(String path, V value, WebRequestQueryContext queryContext) {
        return new GreaterThan(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T, V> Specification<T> greaterThanOrEqual(String path, V value, WebRequestQueryContext queryContext) {
        return new GreaterThanOrEqual(queryContext, path, new String[]{value.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T> Specification<T> isNull(String path, WebRequestQueryContext queryContext) {
        return new Null(queryContext, path, new String[]{Boolean.TRUE.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T> Specification<T> isNotNull(String path, WebRequestQueryContext queryContext) {
        return new NotNull(queryContext, path, new String[]{Boolean.TRUE.toString()}, Converter.withTypeMismatchBehaviour(OnTypeMismatch.EXCEPTION, (ConversionService)null));
    }

    public static <T> Specification<T> and(Specification<T> left, Specification<T> right) {
        if (left == null && right == null) {
            return null;
        } else if (left == null) {
            return right;
        } else {
            return right == null ? left : left.and(right);
        }
    }

    public static <T> Specification<T> or(Specification<T> left, Specification<T> right) {
        if (left == null && right == null) {
            return null;
        } else if (left == null) {
            return right;
        } else {
            return right == null ? left : left.or(right);
        }
    }
}